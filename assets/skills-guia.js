// As 36 skills do guia "Edit video with Claude" (anúncio 03). Gerado de conteudo/guias/2026-10-07-claude-video-editing-skills/skills.json:
// não editar à mão; para mudar, mude o skills.json e rode de novo o trecho em ferramentas/LEIA-ME.md.
window.SKILLS_GUIA = [
 {
  "name": "skill-creator",
  "category": "Start here",
  "confidence": "high",
  "what_it_does": "Builds a new skill from your own editing process, then tests and tunes it until it triggers reliably.",
  "url": "https://github.com/anthropics/skills/tree/main/skills/skill-creator",
  "needs": "Claude Code (or Claude.ai with skills enabled); Python for the eval scripts"
 },
 {
  "name": "find-skills",
  "category": "Start here",
  "confidence": "high",
  "what_it_does": "Searches the skills.sh registry and installs a skill when you ask if one exists for a task.",
  "url": "https://github.com/vercel-labs/skills/tree/main/skills/find-skills",
  "needs": "Node.js (runs npx skills)"
 },
 {
  "name": "video-use",
  "category": "Cutting and assembly",
  "confidence": "high",
  "what_it_does": "Edits raw footage through chat: removes filler and retakes, grades color, burns subtitles, and reviews its own render.",
  "url": "https://github.com/browser-use/video-use",
  "needs": "ffmpeg, Python (uv or pip), ElevenLabs API key for Scribe transcription (paid per use); optional yt-dlp, Node for HyperFrames or Remotion overlays"
 },
 {
  "name": "cut-video",
  "category": "Cutting and assembly",
  "confidence": "medium",
  "what_it_does": "Tightens long recordings by removing silences, ums, false starts and repeats while keeping laughs and comedic pauses.",
  "url": "https://github.com/louisedesadeleer/cut-video",
  "needs": "ffmpeg, Whisper, Montreal Forced Aligner via conda (installs on first run); fastest on Apple Silicon"
 },
 {
  "name": "add-zooms",
  "category": "Cutting and assembly",
  "confidence": "low",
  "what_it_does": "Adds punch-in zooms on emphasized words and slow pushes on key lines of a talking-head clip.",
  "url": "https://github.com/louisedesadeleer/add-zooms",
  "needs": "ffmpeg, a transcript (Whisper); install.sh only symlinks the folder into ~/.claude/skills"
 },
 {
  "name": "find-broll",
  "category": "Cutting and assembly",
  "confidence": "medium",
  "what_it_does": "Reads your transcript, picks the moments that need b-roll, finds candidate clips and places them on the word.",
  "url": "https://github.com/louisedesadeleer/b-roll-finder",
  "needs": "yt-dlp, ffmpeg, ImageMagick, mlx-whisper (Apple Silicon)"
 },
 {
  "name": "net-new-video-editor",
  "category": "Cutting and assembly",
  "confidence": "medium",
  "what_it_does": "Turns a fresh talking-head recording into a vertical draft with captions, hook card, loudness fix and QA frames.",
  "url": "https://github.com/ericosiu/ai-marketing-skills/tree/main/net-new-video-editor",
  "needs": "Python, ffmpeg, Pillow; you supply the transcript"
 },
 {
  "name": "video-editing (ECC)",
  "category": "Cutting and assembly",
  "confidence": "medium",
  "what_it_does": "A playbook for editing real footage: FFmpeg cuts, Remotion overlays, voice and music generation, final polish in CapCut.",
  "url": "https://github.com/affaan-m/ECC/tree/main/skills/video-editing",
  "needs": "ffmpeg; optional Remotion, ElevenLabs and fal.ai keys (paid)"
 },
 {
  "name": "videoeditor (command pack)",
  "category": "Cutting and assembly",
  "confidence": "low",
  "what_it_does": "Eight slash commands that remove silence, zoom on key lines, color correct, master audio and burn captions.",
  "url": "https://github.com/chrislema/videoeditor",
  "needs": "Homebrew ffmpeg plus ffmpeg-full (for drawtext), whisper-cli (whisper.cpp), OpenCV"
 },
 {
  "name": "embedded-captions (HyperFrames)",
  "category": "Captions and transcription",
  "confidence": "high",
  "what_it_does": "Adds captions to a talking-head video, from plain subtitles to text placed behind the speaker, in 35 styles.",
  "url": "https://github.com/heygen-com/hyperframes/tree/main/skills/embedded-captions",
  "needs": "Node.js 22+, ffmpeg; transcription and subject matting run locally"
 },
 {
  "name": "remotion-captions",
  "category": "Captions and transcription",
  "confidence": "high",
  "what_it_does": "Teaches Claude to transcribe, display and animate word-level captions inside a Remotion video project.",
  "url": "https://github.com/remotion-dev/skills/tree/main/skills/remotion-captions",
  "needs": "Node.js and a Remotion project; Remotion is free for individuals and companies up to 3 employees"
 },
 {
  "name": "speech-to-text (ElevenLabs)",
  "category": "Captions and transcription",
  "confidence": "high",
  "what_it_does": "Transcribes audio or video with word timestamps through ElevenLabs Scribe, ready for subtitles and cut lists.",
  "url": "https://github.com/elevenlabs/skills/tree/main/speech-to-text",
  "needs": "ElevenLabs API key (paid per use)"
 },
 {
  "name": "video-subtitler",
  "category": "Captions and transcription",
  "confidence": "low",
  "what_it_does": "Makes a clean SRT subtitle file on your own computer with Whisper, then fixes typos and brand names.",
  "url": "https://github.com/kkoppenhaver/cc-skills/tree/main/video-subtitler",
  "needs": "ffmpeg, whisper.cpp, a Whisper model (150 to 450 MB download); optional yt-dlp"
 },
 {
  "name": "hyperframes",
  "category": "Motion graphics and programmatic video",
  "confidence": "high",
  "what_it_does": "Writes video as HTML and animation code, previews it in a browser, and renders the MP4 locally.",
  "url": "https://github.com/heygen-com/hyperframes/tree/main/skills/hyperframes",
  "needs": "Node.js 22+, ffmpeg (renders through headless Chrome)"
 },
 {
  "name": "talking-head-recut (HyperFrames)",
  "category": "Motion graphics and programmatic video",
  "confidence": "high",
  "what_it_does": "Dresses a talking-head or podcast clip with timed titles, lower thirds, quotes and data callouts synced to speech.",
  "url": "https://github.com/heygen-com/hyperframes/tree/main/skills/talking-head-recut",
  "needs": "Node.js 22+, ffmpeg"
 },
 {
  "name": "remotion-best-practices",
  "category": "Motion graphics and programmatic video",
  "confidence": "high",
  "what_it_does": "Gives Claude Remotion's official rules for building videos in React, and routes to its render and caption skills.",
  "url": "https://github.com/remotion-dev/skills/tree/main/skills/remotion-best-practices",
  "needs": "Node.js; Remotion is free for individuals and companies up to 3 employees, paid company license above that"
 },
 {
  "name": "manim-skill",
  "category": "Motion graphics and programmatic video",
  "confidence": "medium",
  "what_it_does": "Builds 3Blue1Brown-style animations of equations, charts and concepts with Manim, with optional voiceover and subtitles.",
  "url": "https://github.com/Yusuke710/manim-skill",
  "needs": "Python, Manim Community Edition, LaTeX for equations, ffmpeg; optional TTS"
 },
 {
  "name": "music-to-video (HyperFrames)",
  "category": "Audio and music",
  "confidence": "high",
  "what_it_does": "Cuts your images and clips on the beat of a music track, for lyric videos, slideshows or promos.",
  "url": "https://github.com/heygen-com/hyperframes/tree/main/skills/music-to-video",
  "needs": "Node.js 22+, ffmpeg, your own music file; generating a track needs a music provider key"
 },
 {
  "name": "voice-isolator (ElevenLabs)",
  "category": "Audio and music",
  "confidence": "high",
  "what_it_does": "Removes background noise and music from a recording so the voice comes out clean.",
  "url": "https://github.com/elevenlabs/skills/tree/main/voice-isolator",
  "needs": "ElevenLabs API key (paid per use)"
 },
 {
  "name": "music (ElevenLabs)",
  "category": "Audio and music",
  "confidence": "high",
  "what_it_does": "Generates instrumental tracks, jingles or songs with lyrics from a text prompt through the ElevenLabs Music API.",
  "url": "https://github.com/elevenlabs/skills/tree/main/music",
  "needs": "ElevenLabs API key (paid per use)"
 },
 {
  "name": "sound-effects (ElevenLabs)",
  "category": "Audio and music",
  "confidence": "high",
  "what_it_does": "Creates sound effects from a text description, like whooshes, impacts and ambience, with loop and length control.",
  "url": "https://github.com/elevenlabs/skills/tree/main/sound-effects",
  "needs": "ElevenLabs API key (paid per use)"
 },
 {
  "name": "watch",
  "category": "Watching and analyzing video",
  "confidence": "high",
  "what_it_does": "Lets Claude watch a video link or file through frames and transcript, then answer questions about it.",
  "url": "https://github.com/bradautomates/claude-video/tree/main/skills/watch",
  "needs": "Python 3.10+, ffmpeg, yt-dlp; optional free Gemini API key (sends the video to Google) or local WhisperX"
 },
 {
  "name": "watch-skill",
  "category": "Watching and analyzing video",
  "confidence": "medium",
  "what_it_does": "Indexes a video's frames, on-screen text and speech locally so follow-up questions skip reprocessing.",
  "url": "https://github.com/oxbshw/watch-skill",
  "needs": "Node.js 22.19+, Python (pip install watch-skill[standard]), ffmpeg; optional OCR extras"
 },
 {
  "name": "clipify",
  "category": "Repurposing and formats",
  "confidence": "medium",
  "what_it_does": "Finds strong moments in a long video, cuts them, reframes to 9:16 with face tracking, burns captions.",
  "url": "https://github.com/louisedesadeleer/clipify",
  "needs": "ffmpeg, openai-whisper, Python"
 },
 {
  "name": "shorts (claude-shorts)",
  "category": "Repurposing and formats",
  "confidence": "medium",
  "what_it_does": "Ranks clip candidates from a long video, lets you pick, then renders vertical shorts with animated captions.",
  "url": "https://github.com/AgriciDaniel/claude-shorts",
  "needs": "Python, faster-whisper (fastest on an NVIDIA GPU), Node.js and Remotion for captions, ffmpeg"
 },
 {
  "name": "Adobe for creativity (Claude connector)",
  "category": "Repurposing and formats",
  "confidence": "high",
  "what_it_does": "Adobe's official Claude connector; resizes and reframes clips for Reels, Shorts and TikTok using Premiere tools.",
  "url": "https://blog.adobe.com/en/publish/2026/04/28/adobe-for-creativity-connector",
  "needs": "Claude account on claude.ai or Claude Desktop; Adobe ID recommended; some features need a paid plan"
 },
 {
  "name": "thumbnail-video",
  "category": "Repurposing and formats",
  "confidence": "low",
  "what_it_does": "Pulls strong frames from your video and adds headline text to make three YouTube thumbnail variants.",
  "url": "https://github.com/smitmartijn/claude-skills/tree/main/thumbnail-video",
  "needs": "ffmpeg, Python, Chrome or Chromium; loads Google Fonts at render time; uses its sibling transcribe-video skill"
 },
 {
  "name": "Descript MCP",
  "category": "Drive your editing app (plugins and MCP)",
  "confidence": "high",
  "what_it_does": "Descript's official plugin: Claude imports media and edits by text, removing filler words and adding captions.",
  "url": "https://github.com/descriptinc/descript-mcp",
  "needs": "Descript account (OAuth sign-in); edits spend AI credits from your Descript plan"
 },
 {
  "name": "DaVinci Resolve MCP",
  "category": "Drive your editing app (plugins and MCP)",
  "confidence": "high",
  "what_it_does": "Lets Claude drive DaVinci Resolve: rough cuts, dead-air removal, color, audio and render, with bundled skills.",
  "url": "https://github.com/samuelgursky/davinci-resolve-mcp",
  "needs": "DaVinci Resolve Studio (paid; the free edition only works partly through an in-app bridge up to 21.0.x), Python 3.10+, Node for npx setup"
 },
 {
  "name": "Premiere Pro MCP",
  "category": "Drive your editing app (plugins and MCP)",
  "confidence": "medium",
  "what_it_does": "Connects Claude to Premiere Pro to organize projects, build timelines, apply edits and check exports locally.",
  "url": "https://github.com/leancoderkavy/premiere-pro-mcp",
  "needs": "Adobe Premiere Pro (subscription), Node.js, a local CEP or UXP bridge panel"
 },
 {
  "name": "CapCut SmartCut MCP",
  "category": "Drive your editing app (plugins and MCP)",
  "confidence": "low",
  "what_it_does": "Reads CapCut's auto captions to cut pauses and earlier duplicate takes directly in your CapCut project.",
  "url": "https://github.com/mrbuslov/capcut-ai-editor",
  "needs": "CapCut desktop, Python 3.10+; optional OpenAI API key for better duplicate detection"
 },
 {
  "name": "After Effects MCP",
  "category": "Drive your editing app (plugins and MCP)",
  "confidence": "low",
  "what_it_does": "Lets Claude create compositions, text, shapes and keyframes inside After Effects through a bridge panel.",
  "url": "https://github.com/Dakkshin/after-effects-mcp",
  "needs": "Adobe After Effects (subscription), Node.js 14+, a bridge script installed inside After Effects"
 },
 {
  "name": "Final Cut Pro MCP (fcp-mcp)",
  "category": "Drive your editing app (plugins and MCP)",
  "confidence": "low",
  "what_it_does": "Reads and edits Final Cut Pro timelines as FCPXML, with a review and approval step before each change.",
  "url": "https://github.com/dreliq9/fcp-mcp",
  "needs": "macOS 15.6+, Final Cut Pro (paid), Python 3.10+, ffmpeg"
 },
 {
  "name": "claude-code-video-toolkit",
  "category": "All-in-one kits",
  "confidence": "high",
  "what_it_does": "A full workspace where Claude scripts, voices, scores and renders explainer videos, mostly on open-source models.",
  "url": "https://github.com/digitalsamba/claude-code-video-toolkit",
  "needs": "Node.js 18+, uv (Python); optional cloud GPU (Modal or RunPod), Cloudflare R2, ffmpeg"
 },
 {
  "name": "OpenMontage",
  "category": "All-in-one kits",
  "confidence": "high",
  "what_it_does": "An open-source production system with 12 pipelines that research, script, narrate, cut and render videos.",
  "url": "https://github.com/calesthio/OpenMontage",
  "needs": "Python, Node.js, ffmpeg, make; free path with Piper TTS and free stock keys (Pexels, Pixabay); paid providers optional"
 },
 {
  "name": "claude-video (suite)",
  "category": "All-in-one kits",
  "confidence": "low",
  "what_it_does": "Sixteen video skills for trimming, captions, transcoding, audio cleanup, upscaling and shorts, tuned for NVIDIA GPUs.",
  "url": "https://github.com/AgriciDaniel/claude-video",
  "needs": "ffmpeg, Python, NVIDIA GPU for speed (NVENC); optional Google API key (Gemini, Veo), Real-ESRGAN, Demucs"
 }
];
