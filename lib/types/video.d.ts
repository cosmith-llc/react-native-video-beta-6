import type { ISO639_1 } from './language';
import type { ReactVideoEvents } from './events';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type VideoResizeMode from './ResizeMode';
import type FilterType from './FilterType';
export type Headers = Record<string, string>;
export type EnumValues<T extends string | number> = T extends string ? `${T}` | T : T;
export type ReactVideoSourceProperties = {
    uri?: string;
    isNetwork?: boolean;
    isAsset?: boolean;
    shouldCache?: boolean;
    type?: string;
    mainVer?: number;
    patchVer?: number;
    headers?: Headers;
    startPosition?: number;
    cropStart?: number;
    cropEnd?: number;
    title?: string;
    subtitle?: string;
    description?: string;
    customImageUri?: string;
};
export type ReactVideoSource = Readonly<ReactVideoSourceProperties | NodeRequire>;
export type DebugConfig = Readonly<{
    enable?: boolean;
    thread?: boolean;
}>;
export declare enum DRMType {
    WIDEVINE = "widevine",
    PLAYREADY = "playready",
    CLEARKEY = "clearkey",
    FAIRPLAY = "fairplay"
}
export type Drm = Readonly<{
    type?: DRMType;
    licenseServer?: string;
    headers?: Headers;
    contentId?: string;
    certificateUrl?: string;
    base64Certificate?: boolean;
    getLicense?: (licenseUrl: string, contentId: string, spcBase64: string) => void;
}>;
export type BufferConfig = {
    minBufferMs?: number;
    maxBufferMs?: number;
    bufferForPlaybackMs?: number;
    bufferForPlaybackAfterRebufferMs?: number;
    maxHeapAllocationPercent?: number;
    minBackBufferMemoryReservePercent?: number;
    minBufferMemoryReservePercent?: number;
};
export declare enum SelectedTrackType {
    SYSTEM = "system",
    DISABLED = "disabled",
    TITLE = "title",
    LANGUAGE = "language",
    INDEX = "index"
}
export type SelectedTrack = {
    type: SelectedTrackType;
    value?: string | number;
};
export declare enum SelectedVideoTrackType {
    AUTO = "auto",
    DISABLED = "disabled",
    RESOLUTION = "resolution",
    INDEX = "index"
}
export type SelectedVideoTrack = {
    type: SelectedVideoTrackType;
    value?: number;
};
export type SubtitleStyle = {
    fontSize?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
};
export declare enum TextTracksType {
    SUBRIP = "application/x-subrip",
    TTML = "application/ttml+xml",
    VTT = "text/vtt"
}
export type TextTracks = {
    title: string;
    language: ISO639_1;
    type: TextTracksType;
    uri: string;
}[];
export type TextTrackType = 'system' | 'disabled' | 'title' | 'language' | 'index';
export type SelectedTextTrack = Readonly<{
    type: TextTrackType;
    value?: string | number;
}>;
export type AudioTrackType = 'system' | 'disabled' | 'title' | 'language' | 'index';
export type SelectedAudioTrack = Readonly<{
    type: AudioTrackType;
    value?: string | number;
}>;
export type Chapters = {
    title: string;
    startTime: number;
    endTime: number;
    uri?: string;
};
export declare enum FullscreenOrientationType {
    ALL = "all",
    LANDSCAPE = "landscape",
    PORTRAIT = "portrait"
}
export declare enum IgnoreSilentSwitchType {
    INHERIT = "inherit",
    IGNORE = "ignore",
    OBEY = "obey"
}
export declare enum MixWithOthersType {
    INHERIT = "inherit",
    MIX = "mix",
    DUCK = "duck"
}
export declare enum PosterResizeModeType {
    CONTAIN = "contain",
    CENTER = "center",
    COVER = "cover",
    NONE = "none",
    REPEAT = "repeat",
    STRETCH = "stretch"
}
export type AudioOutput = 'speaker' | 'earpiece';
export interface ReactVideoProps extends ReactVideoEvents, ViewProps {
    source?: ReactVideoSource;
    drm?: Drm;
    style?: StyleProp<ViewStyle>;
    adTagUrl?: string;
    audioOnly?: boolean;
    audioOutput?: AudioOutput;
    automaticallyWaitsToMinimizeStalling?: boolean;
    backBufferDurationMs?: number;
    bufferConfig?: BufferConfig;
    chapters?: Chapters[];
    contentStartTime?: number;
    controls?: boolean;
    currentPlaybackTime?: number;
    disableFocus?: boolean;
    disableDisconnectError?: boolean;
    filter?: EnumValues<FilterType>;
    filterEnabled?: boolean;
    focusable?: boolean;
    fullscreen?: boolean;
    fullscreenAutorotate?: boolean;
    fullscreenOrientation?: EnumValues<FullscreenOrientationType>;
    hideShutterView?: boolean;
    ignoreSilentSwitch?: EnumValues<IgnoreSilentSwitchType>;
    minLoadRetryCount?: number;
    maxBitRate?: number;
    mixWithOthers?: EnumValues<MixWithOthersType>;
    muted?: boolean;
    paused?: boolean;
    pictureInPicture?: boolean;
    playInBackground?: boolean;
    playWhenInactive?: boolean;
    poster?: string;
    posterResizeMode?: EnumValues<PosterResizeModeType>;
    preferredForwardBufferDuration?: number;
    preventsDisplaySleepDuringVideoPlayback?: boolean;
    progressUpdateInterval?: number;
    rate?: number;
    repeat?: boolean;
    reportBandwidth?: boolean;
    resizeMode?: EnumValues<VideoResizeMode>;
    selectedAudioTrack?: SelectedTrack;
    selectedTextTrack?: SelectedTrack;
    selectedVideoTrack?: SelectedVideoTrack;
    subtitleStyle?: SubtitleStyle;
    textTracks?: TextTracks;
    testID?: string;
    trackId?: string;
    useTextureView?: boolean;
    useSecureView?: boolean;
    volume?: number;
    localSourceEncryptionKeyScheme?: string;
    debug?: DebugConfig;
    allowsExternalPlayback?: boolean;
}
