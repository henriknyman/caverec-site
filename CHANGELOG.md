# Changelog

All notable changes to **Cave Recorder (`caverec`)** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-10-21

### Added

- **Core Recording Hierarchy (`Project` -> `Session` -> `Take` -> `Pass`):** Four-level studio organization with 08:00 local session day rollover, independent `00:00:00.000` (`t = 0`) multitrack `Take` timelines, expandable track-level `PassLane`s (`Rec001` Base Pass and `Rec002-OD` Overdub Passes) for non-destructive comping, `NEW TAKE` / `SPLIT TAKE` range extraction, and built-in session templates (`MicAndGuitar001` 2-channel and `GuitarBassDrumTrio001` 11-channel) plus custom `SAVE TEMPLATE` studio layouts up to 18 channels.
- **30-Minute Retroactive RAM Capture & Live Stereo `Print`:** Lock-free 30-minute rolling RAM ring buffer (`RETRO (SHIFT+R)`) across up to 18 input channels alongside simultaneous 32-bit IEEE float BWF `.wav` stem recording and live post-`Master Bus` 2-track `Print` capture.
- **Dark Heritage Console & Real-Time DSP Rack:** Six studio workspace views (`Mix Console`, `Waveform Timeline`, `Channel Inspector`, `Session Reel`, `Markers & Ranges`, and customizable 58-action `Keymap`) with a reorderable 8-slot per-strip and per-`Subgroup` processor rack (`12-Band Parametric EQ` with Dual-Trace RTA, `VCA Compressor`, `Tape Saturation`, and `Aux Send Tap`), dedicated stereo `AUX 1 REVERB` (partitioned FFT convolution reverb with dynamic `DCY` plate IR rebuild) and `AUX 2 TAPE DLY` returns, `Master Bus` tape/compressor/brickwall limiter with `2-TRK` live printing and `FLAC` & `MP3` `BOUNCE`, automatic Plugin Delay Compensation (`PDC`) with `Low-Latency Monitoring`, and hardware `Roundtrip Loopback Calibration` (`Measure Latency` and `RE-APPLY MEASURED OFFSET`).
- **Sub-Sample Multi-Mic Phase Alignment (`ALIGN Φ`):** GCC-PHAT cross-correlation phase optimizer computing polarity inversion (`Ø`) and microsecond-persisted sub-sample Thiran allpass fractional delay against a reference microphone.
- **24-Bit Lossless `FLAC` & 320 kbps CBR `MP3` `Print`s, `Mixdown`s, and `Stem Bounce`s:** One-click `FLAC PRINT` / `MP3 PRINT` conversion in the `Session Reel` and offline `Master Bus` `Mixdown` / per-track `Stem Bounce` exports with automatic `<ProjectTag>/_Mixes/` indexing for native web browser and mobile playback.
- **`Snapshot`s, `Present Stash` A/B Recall & Federated Google Drive Sync:** Immutable console `Snapshot`s with automatic `Present Stash` live state protection, plus native OAuth 2.0 PKCE Google Drive synchronization featuring `.caverec_project.json` CRDT `Project Cloud Index` discovery, `Linked Remote Project` sharing, `Causal Revision Lineage` conflict protection, and `.caverec_lock.json` `Session Lock` leases with `Read-Only Preview` mode.
- **Cross-Platform Desktop & Headless Distribution:** Native macOS (`aarch64` CoreAudio `.app` bundle), Windows (`x86_64` WASAPI `.exe`), and Linux (`x86_64` ALSA) builds paired with `caverec-headless` and the offline `Cave_Recorder_User_Manual.pdf`.
