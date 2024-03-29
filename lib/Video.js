import React, { useState, useCallback, useMemo, useRef, forwardRef, useImperativeHandle, } from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import NativeVideoComponent, {} from './VideoNativeComponent';
import { getReactTag, resolveAssetSourceForVideo } from './utils';
import { VideoManager } from './VideoNativeComponent';
const Video = forwardRef(({ source, style, resizeMode, posterResizeMode, poster, fullscreen, drm, textTracks, selectedVideoTrack, selectedAudioTrack, selectedTextTrack, onLoadStart, onLoad, onError, onProgress, onSeek, onEnd, onBuffer, onBandwidthUpdate, onExternalPlaybackChange, onFullscreenPlayerWillPresent, onFullscreenPlayerDidPresent, onFullscreenPlayerWillDismiss, onFullscreenPlayerDidDismiss, onReadyForDisplay, onPlaybackRateChange, onVolumeChange, onAudioBecomingNoisy, onPictureInPictureStatusChanged, onRestoreUserInterfaceForPictureInPictureStop, onReceiveAdEvent, onPlaybackStateChanged, onAudioFocusChanged, onIdle, onTimedMetadata, onAudioTracks, onTextTracks, onVideoTracks, onAspectRatio, ...rest }, ref) => {
    const nativeRef = useRef(null);
    const [showPoster, setShowPoster] = useState(!!poster);
    const [isFullscreen, setIsFullscreen] = useState(fullscreen);
    const [_restoreUserInterfaceForPIPStopCompletionHandler, setRestoreUserInterfaceForPIPStopCompletionHandler,] = useState();
    const posterStyle = useMemo(() => ({
        ...StyleSheet.absoluteFillObject,
        resizeMode: posterResizeMode && posterResizeMode !== 'none'
            ? posterResizeMode
            : 'contain',
    }), [posterResizeMode]);
    const src = useMemo(() => {
        if (!source) {
            return undefined;
        }
        const resolvedSource = resolveAssetSourceForVideo(source);
        let uri = resolvedSource.uri || '';
        if (uri && uri.match(/^\//)) {
            uri = `file://${uri}`;
        }
        if (!uri) {
            console.log('Trying to load empty source');
        }
        const isNetwork = !!(uri && uri.match(/^https?:/));
        const isAsset = !!(uri &&
            uri.match(/^(assets-library|ipod-library|file|content|ms-appx|ms-appdata):/));
        return {
            uri,
            isNetwork,
            isAsset,
            shouldCache: resolvedSource.shouldCache || false,
            type: resolvedSource.type || '',
            mainVer: resolvedSource.mainVer || 0,
            patchVer: resolvedSource.patchVer || 0,
            requestHeaders: resolvedSource.headers || {},
            startPosition: resolvedSource.startPosition ?? -1,
            cropStart: resolvedSource.cropStart || 0,
            cropEnd: resolvedSource.cropEnd,
            title: resolvedSource.title,
            subtitle: resolvedSource.subtitle,
            description: resolvedSource.description,
            customImageUri: resolvedSource.customImageUri,
        };
    }, [source]);
    const _drm = useMemo(() => {
        if (!drm) {
            return;
        }
        return {
            type: drm.type,
            licenseServer: drm.licenseServer,
            headers: drm.headers,
            contentId: drm.contentId,
            certificateUrl: drm.certificateUrl,
            base64Certificate: drm.base64Certificate,
            useExternalGetLicense: !!drm.getLicense,
        };
    }, [drm]);
    const _selectedTextTrack = useMemo(() => {
        if (!selectedTextTrack) {
            return;
        }
        return {
            type: selectedTextTrack?.type,
            value: selectedTextTrack?.value,
        };
    }, [selectedTextTrack]);
    const _selectedAudioTrack = useMemo(() => {
        if (!selectedAudioTrack) {
            return;
        }
        return {
            type: selectedAudioTrack?.type,
            value: selectedAudioTrack?.value,
        };
    }, [selectedAudioTrack]);
    const _selectedVideoTrack = useMemo(() => {
        if (!selectedVideoTrack) {
            return;
        }
        return {
            type: selectedVideoTrack?.type,
            value: selectedVideoTrack?.value,
        };
    }, [selectedVideoTrack]);
    const seek = useCallback(async (time, tolerance) => {
        if (isNaN(time)) {
            throw new Error('Specified time is not a number');
        }
        if (!nativeRef.current) {
            console.warn('Video Component is not mounted');
            return;
        }
        Platform.select({
            ios: () => {
                nativeRef.current?.setNativeProps({
                    seek: {
                        time,
                        tolerance: tolerance || 0,
                    },
                });
            },
            default: () => {
                nativeRef.current?.setNativeProps({
                    seek: time,
                });
            },
        })();
    }, []);
    const presentFullscreenPlayer = useCallback(() => {
        setIsFullscreen(true);
    }, [setIsFullscreen]);
    const dismissFullscreenPlayer = useCallback(() => {
        setIsFullscreen(false);
    }, [setIsFullscreen]);
    const save = useCallback((options) => {
        // VideoManager.save can be null on android & windows
        return VideoManager.save?.(options, getReactTag(nativeRef));
    }, []);
    const pause = useCallback(() => {
        return VideoManager.setPlayerPauseState(true, getReactTag(nativeRef));
    }, []);
    const resume = useCallback(() => {
        return VideoManager.setPlayerPauseState(false, getReactTag(nativeRef));
    }, []);
    const restoreUserInterfaceForPictureInPictureStopCompleted = useCallback((restored) => {
        setRestoreUserInterfaceForPIPStopCompletionHandler(restored);
    }, [setRestoreUserInterfaceForPIPStopCompletionHandler]);
    const onVideoLoadStart = useCallback((e) => {
        onLoadStart?.(e.nativeEvent);
    }, [onLoadStart]);
    const onVideoLoad = useCallback((e) => {
        if (Platform.OS === 'windows') {
            setShowPoster(false);
        }
        onLoad?.(e.nativeEvent);
    }, [onLoad, setShowPoster]);
    const onVideoError = useCallback((e) => {
        onError?.(e.nativeEvent);
    }, [onError]);
    const onVideoProgress = useCallback((e) => {
        onProgress?.(e.nativeEvent);
    }, [onProgress]);
    const onVideoSeek = useCallback((e) => {
        onSeek?.(e.nativeEvent);
    }, [onSeek]);
    const onVideoPlaybackStateChanged = useCallback((e) => {
        onPlaybackStateChanged?.(e.nativeEvent);
    }, [onPlaybackStateChanged]);
    // android only
    const onVideoIdle = useCallback(() => {
        onIdle?.();
    }, [onIdle]);
    const _onTimedMetadata = useCallback((e) => {
        onTimedMetadata?.(e.nativeEvent);
    }, [onTimedMetadata]);
    const _onAudioTracks = useCallback((e) => {
        onAudioTracks?.(e.nativeEvent);
    }, [onAudioTracks]);
    const _onTextTracks = useCallback((e) => {
        onTextTracks?.(e.nativeEvent);
    }, [onTextTracks]);
    const _onVideoTracks = useCallback((e) => {
        onVideoTracks?.(e.nativeEvent);
    }, [onVideoTracks]);
    const _onPlaybackRateChange = useCallback((e) => {
        onPlaybackRateChange?.(e.nativeEvent);
    }, [onPlaybackRateChange]);
    const _onVolumeChange = useCallback((e) => {
        onVolumeChange?.(e.nativeEvent);
    }, [onVolumeChange]);
    const _onReadyForDisplay = useCallback(() => {
        setShowPoster(false);
        onReadyForDisplay?.();
    }, [setShowPoster, onReadyForDisplay]);
    const _onPictureInPictureStatusChanged = useCallback((e) => {
        onPictureInPictureStatusChanged?.(e.nativeEvent);
    }, [onPictureInPictureStatusChanged]);
    const _onAudioFocusChanged = useCallback((e) => {
        onAudioFocusChanged?.(e.nativeEvent);
    }, [onAudioFocusChanged]);
    const onVideoBuffer = useCallback((e) => {
        onBuffer?.(e.nativeEvent);
    }, [onBuffer]);
    const onVideoExternalPlaybackChange = useCallback((e) => {
        onExternalPlaybackChange?.(e.nativeEvent);
    }, [onExternalPlaybackChange]);
    const _onBandwidthUpdate = useCallback((e) => {
        onBandwidthUpdate?.(e.nativeEvent);
    }, [onBandwidthUpdate]);
    const _onReceiveAdEvent = useCallback((e) => {
        onReceiveAdEvent?.(e.nativeEvent);
    }, [onReceiveAdEvent]);
    const _onVideoAspectRatio = useCallback((e) => {
        onAspectRatio?.(e.nativeEvent);
    }, [onAspectRatio]);
    const onGetLicense = useCallback((event) => {
        if (drm && drm.getLicense instanceof Function) {
            const data = event.nativeEvent;
            if (data && data.spcBase64) {
                const getLicenseOverride = drm.getLicense(data.spcBase64, data.contentId, data.licenseUrl);
                const getLicensePromise = Promise.resolve(getLicenseOverride); // Handles both scenarios, getLicenseOverride being a promise and not.
                getLicensePromise
                    .then((result) => {
                    if (result !== undefined) {
                        nativeRef.current &&
                            VideoManager.setLicenseResult(result, data.licenseUrl, getReactTag(nativeRef));
                    }
                    else {
                        nativeRef.current &&
                            VideoManager.setLicenseResultError('Empty license result', data.licenseUrl, getReactTag(nativeRef));
                    }
                })
                    .catch(() => {
                    nativeRef.current &&
                        VideoManager.setLicenseResultError('fetch error', data.licenseUrl, getReactTag(nativeRef));
                });
            }
            else {
                VideoManager.setLicenseResultError('No spc received', data.licenseUrl, getReactTag(nativeRef));
            }
        }
    }, [drm]);
    useImperativeHandle(ref, () => ({
        seek,
        presentFullscreenPlayer,
        dismissFullscreenPlayer,
        save,
        pause,
        resume,
        restoreUserInterfaceForPictureInPictureStopCompleted,
    }), [
        seek,
        presentFullscreenPlayer,
        dismissFullscreenPlayer,
        save,
        pause,
        resume,
        restoreUserInterfaceForPictureInPictureStopCompleted,
    ]);
    return (React.createElement(View, { style: style },
        React.createElement(NativeVideoComponent, { ref: nativeRef, ...rest, src: src, drm: _drm, style: StyleSheet.absoluteFill, resizeMode: resizeMode, fullscreen: isFullscreen, restoreUserInterfaceForPIPStopCompletionHandler: _restoreUserInterfaceForPIPStopCompletionHandler, textTracks: textTracks, selectedTextTrack: _selectedTextTrack, selectedAudioTrack: _selectedAudioTrack, selectedVideoTrack: _selectedVideoTrack, onGetLicense: onGetLicense, onVideoLoad: onVideoLoad, onVideoLoadStart: onVideoLoadStart, onVideoError: onVideoError, onVideoProgress: onVideoProgress, onVideoSeek: onVideoSeek, onVideoEnd: onEnd, onVideoBuffer: onVideoBuffer, onVideoPlaybackStateChanged: onVideoPlaybackStateChanged, onVideoBandwidthUpdate: _onBandwidthUpdate, onTimedMetadata: _onTimedMetadata, onAudioTracks: _onAudioTracks, onTextTracks: _onTextTracks, onVideoTracks: _onVideoTracks, onVideoFullscreenPlayerDidDismiss: onFullscreenPlayerDidDismiss, onVideoFullscreenPlayerDidPresent: onFullscreenPlayerDidPresent, onVideoFullscreenPlayerWillDismiss: onFullscreenPlayerWillDismiss, onVideoFullscreenPlayerWillPresent: onFullscreenPlayerWillPresent, onVideoExternalPlaybackChange: onVideoExternalPlaybackChange, onVideoIdle: onVideoIdle, onAudioFocusChanged: _onAudioFocusChanged, onReadyForDisplay: _onReadyForDisplay, onPlaybackRateChange: _onPlaybackRateChange, onVolumeChange: _onVolumeChange, onVideoAudioBecomingNoisy: onAudioBecomingNoisy, onPictureInPictureStatusChanged: _onPictureInPictureStatusChanged, onRestoreUserInterfaceForPictureInPictureStop: onRestoreUserInterfaceForPictureInPictureStop, onVideoAspectRatio: _onVideoAspectRatio, onReceiveAdEvent: _onReceiveAdEvent }),
        showPoster ? (React.createElement(Image, { style: posterStyle, source: { uri: poster } })) : null));
});
Video.displayName = 'Video';
export default Video;
//# sourceMappingURL=Video.js.map