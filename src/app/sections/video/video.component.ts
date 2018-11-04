import {Component, OnDestroy, OnInit} from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {AuthenticationService} from '@shared/services/auth/authentication.service';
import {Attachment} from '@shared/classes/attachment';
import {Subject} from 'rxjs/Subject';
import {FileUploader} from 'ng2-file-upload';
import {VideoService} from './video.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-video',
    templateUrl: 'video.html',
})
export class VideoComponent implements OnInit, OnDestroy{
    api: VgAPI;
    currentMedia: Attachment;
    attachments: Attachment[];
    paused = true;

    public uploader: FileUploader = new FileUploader({url: '/api/upload'});

    private _onDestroy = new Subject<void>();

    constructor(public authenticationService: AuthenticationService, private videoService: VideoService) {
        this.getMedias();
    }

    ngOnInit(){
        this.uploader.onSuccessItem = (item, response, status, headers) => this.getMedias();
    }

    getMedias(): void{
        this.currentMedia = null;
        this.videoService.getMedias()
            .subscribe( (attachments: Attachment[]) =>  {
                this.attachments = attachments;
                this.currentMedia = attachments.filter(x => x.selected)[0];
            });
    }

    fileChangeEvent() {
        this.uploader.uploadAll();
    }

    mediaChangeEvent(attachment: Attachment) {
        if (this.currentMedia === attachment) return;

        this.currentMedia = null;

        this.videoService.setCurrentMedia(attachment).subscribe(() => {
            this.currentMedia = attachment;
        });
    }

    mediaDeleteEvent(attachment: Attachment) {
        if (attachment === this.currentMedia) this.currentMedia = null;

        this.videoService.deleteMedia(attachment).subscribe((mediafile) => {
            this.attachments.splice(this.attachments.indexOf(attachment), 1);
            if (mediafile) this.currentMedia = this.attachments.find( x => x._id === mediafile._id);
        });
    }

    playOrPause(): void{
        this.paused ? this.play() : this.pause();
    }

    play(): void{
        this.videoService.play(this.api.currentTime);
    }
    pause(): void{
        this.videoService.pause(this.api.currentTime);
    }

    onPlayerReady(api: VgAPI) {
        this.api = api;

        this.api.subscriptions.ended.pipe(takeUntil(this._onDestroy)).subscribe(
            () => {
                this.paused = true;
            }
        );

        this.videoService.onPause().pipe(takeUntil(this._onDestroy)).subscribe((time: number) => {
            this.api.getDefaultMedia().currentTime = time;
            this.api.pause();
            this.paused = true;
        });

        this.videoService.onPlay().pipe(takeUntil(this._onDestroy)).subscribe((time: number) => {
            this.api.getDefaultMedia().currentTime = time;
            this.api.play();
            this.paused = false;
        });

        this.authenticationService.currentUser$.subscribe(user => {
            if (user.role.hasControlAccess){
                this.api.subscriptions.seeked.pipe(takeUntil(this._onDestroy)).subscribe(() => {
                        this.videoService.setTime(this.api.currentTime);
                    }
                );
                this.api.subscriptions.rateChange.pipe(takeUntil(this._onDestroy)).subscribe(() => {
                        this.videoService.changeRate(this.api.playbackRate);
                    }
                );
            }else{
                this.videoService.onChangeMedia().pipe(takeUntil(this._onDestroy)).subscribe(() => {
                    this.getMedias();
                });

                this.videoService.onSetTime().pipe(takeUntil(this._onDestroy)).subscribe((time: number) => {
                    this.api.currentTime = time;
                });

                this.videoService.onRateChange().pipe(takeUntil(this._onDestroy)).subscribe((playbackRate: number) => {
                    this.api.playbackRate = playbackRate;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
