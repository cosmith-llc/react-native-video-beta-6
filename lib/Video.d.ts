import React from 'react';
import type { ReactVideoProps } from './types';
export type VideoSaveData = {
    uri: string;
};
export interface VideoRef {
    seek: (time: number, tolerance?: number) => void;
    resume: () => void;
    pause: () => void;
    presentFullscreenPlayer: () => void;
    dismissFullscreenPlayer: () => void;
    restoreUserInterfaceForPictureInPictureStopCompleted: (restore: boolean) => void;
    save: (options: object) => Promise<VideoSaveData>;
}
declare const Video: React.ForwardRefExoticComponent<ReactVideoProps & React.RefAttributes<VideoRef>>;
export default Video;
