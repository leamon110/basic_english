// ============================================================
// MAIN APP — Router & State
// ============================================================

function navigateTo(page) {
  // Set hash (will trigger hashchange)
  const hash = page === 'home' ? '' : page
  if (location.hash.slice(1) !== hash) {
    location.hash = hash
  } else {
    renderPage(page)
  }
}

function renderPage(page) {
  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.page === page)
  })

  const main = document.getElementById('main-content')
  if (!main) return

  if (page === 'home') renderHome(main)
  else if (page === 'conversation') window.BE.chat.renderChat(main)
  else if (page === 'teaching') window.BE.teaching.renderTeaching(main)
  else if (page === 'course') window.BE.course.render()
  else if (page === 'expression') {
    window.BE.expression.render(main)
    if (window.BE.expressionCurriculum) window.BE.expressionCurriculum.render(main)
    if (window.BE.meaningBasic) window.BE.meaningBasic.render(main)
  }
  else if (page === 'sentences') window.BE.sentences.render(main)
}

function renderHome(container) {
  const WORDS = window.BE.WORDS

  container.innerHTML = `
    <div class="home-layout">
      <div class="home-hero">
        <h1>Basic English</h1>
        <p class="home-subtitle">C. K. Ogden's 850-word International Language</p>
        <p class="home-desc">
          Basic English is a system of 850 English words with simple rules.
          It does the work of 20,000 words in normal English.
          Every word and rule here comes from Ogden's system.
        </p>
      </div>
      <div class="home-cards">
        <div class="home-card" onclick="navigateTo('course')">
          <div class="home-card-icon">🧭</div>
          <h2>原版 45 步课程</h2>
          <p>按照 Ogden 原版 45 个 Step 学习。目前 14 课完成中文改编，其余仍是原版网页入口。</p>
          <span class="home-card-link">进入课程目录 →</span>
        </div>
        <div class="home-card" onclick="navigateTo('expression')">
          <div class="home-card-icon">🧠</div>
          <h2>表达系统 · Expression System</h2>
          <p>学习如何从真实意思出发，用850个基础词重新组织表达。包含 speak 课程和第一组支持多种答案的 Meaning → Basic 练习。</p>
          <span class="home-card-link">开始表达训练 →</span>
        </div>
        <div class="home-card" onclick="navigateTo('sentences')">
          <div class="home-card-icon">🧩</div>
          <h2>句型练习</h2>
          <p>100 个完整例句、20 道句子组装练习、10 组情景对话，帮助你练习用基础词汇组织表达。</p>
          <span class="home-card-link">开始练习 →</span>
        </div>
        <div class="home-card" onclick="navigateTo('conversation')">
          <div class="home-card-icon">💬</div>
          <h2>Conversation</h2>
          <p>Talk with an AI that uses only Basic English. Your own words are checked against the 850-word list.</p>
          <span class="home-card-link">Start Talking →</span>
        </div>
        <div class="home-card" onclick="navigateTo('teaching')">
          <div class="home-card-icon">📖</div>
          <h2>850 词汇学习 · Teaching</h2>
          <p>浏览完整 850 个基础词。点击单词打开独立词卡，查看中文释义和英语发音；还可练习构词与语法规则。</p>
          <span class="home-card-link">进入单词卡 →</span>
        </div>
      </div>
      <div class="home-stats">
        <div class="stat">
          <span class="stat-num">${[...WORDS.ALL_850].length}</span>
          <span class="stat-label">Words</span>
        </div>
        <div class="stat">
          <span class="stat-num">${WORDS.NOUNS_WITH_DERIVATIVES.size}</span>
          <span class="stat-label">Derivable Nouns</span>
        </div>
        <div class="stat">
          <span class="stat-num">${WORDS.UN_PREFIX_ADJECTIVES.size}</span>
          <span class="stat-label">un- Adjectives</span>
        </div>
        <div class="stat">
          <span class="stat-num">${WORDS.INTERNATIONAL_WORDS.size}</span>
          <span class="stat-label">International Words</span>
        </div>
      </div>
    </div>
  `
}

// ============================================================
// SPEECH PLAYBACK
// Basic English words use bundled human recordings. Browser TTS remains
// only as a fallback for multi-word sentences and other text not in the 850.
// ============================================================
var _beVoices = []
var _beSpeechAvailable = false
var _beSpeechLastState = 'not-initialized'
var _beSpeechLastError = null
var _beCurrentWordAudio = null

function _beHasBrowserSpeechApi() {
  return !!(window.speechSynthesis &&
            typeof window.SpeechSynthesisUtterance === 'function')
}

function _beSetSpeechAvailable(available) {
  _beSpeechAvailable = !!available
  if (!document.body) return
  if (_beSpeechAvailable) {
    document.body.classList.add('speech-available')
    document.body.classList.remove('speech-unavailable')
  } else {
    document.body.classList.add('speech-unavailable')
    document.body.classList.remove('speech-available')
  }
}

function _beInitSpeech() {
  // Audio playback is available independently of Android's selected TTS engine.
  _beSetSpeechAvailable(typeof window.Audio === 'function')

  // Load browser voices only for sentence fallback; word cards do not use them.
  if (_beHasBrowserSpeechApi()) {
    try {
      _beVoices = window.speechSynthesis.getVoices() || []
      var synth = window.speechSynthesis
      if (typeof synth.addEventListener === 'function') {
        synth.addEventListener('voiceschanged', function() {
          try { _beVoices = synth.getVoices() || [] } catch (e) {}
        })
      } else {
        synth.onvoiceschanged = function() {
          try { _beVoices = synth.getVoices() || [] } catch (e) {}
        }
      }
    } catch (e) {
      _beVoices = []
    }
  }
}

function _bePickEnglishVoice() {
  return _beVoices.find(function(v) { return /en[-_]US/i.test(v.lang) }) ||
         _beVoices.find(function(v) { return /^en/i.test(v.lang) }) ||
         null
}

function _bePlayHumanWord(word) {
  if (typeof window.Audio !== 'function') return false
  var normalized = String(word || '').trim().toLowerCase()
  if (!/^[a-z]+$/.test(normalized)) return false

  if (_beCurrentWordAudio) {
    try {
      _beCurrentWordAudio.pause()
      _beCurrentWordAudio.currentTime = 0
    } catch (e) {}
  }

  var audio = new Audio('audio/words/' + encodeURIComponent(normalized) + '.mp3')
  _beCurrentWordAudio = audio
  audio.onplay = function() {
    _beSpeechLastState = 'human-audio-playing'
    _beSpeechLastError = null
  }
  audio.onended = function() {
    _beSpeechLastState = 'human-audio-ended'
  }
  audio.onerror = function() {
    _beSpeechLastState = 'human-audio-error'
    _beSpeechLastError = 'audio-file-unavailable:' + normalized
    console.warn('[Basic English] Human pronunciation file failed:', normalized)
  }

  try {
    var result = audio.play()
    if (result && typeof result.catch === 'function') {
      result.catch(function(error) {
        _beSpeechLastState = 'human-audio-error'
        _beSpeechLastError = String(error)
        console.warn('[Basic English] Human pronunciation playback failed:', error)
      })
    }
    _beSpeechLastState = 'human-audio-queued'
    return true
  } catch (e) {
    _beSpeechLastState = 'human-audio-error'
    _beSpeechLastError = String(e)
    return false
  }
}

function speak(text, rate) {
  if (!text) return false

  // A single word from the 850-word list is played from its local human recording.
  var raw = String(text).trim()
  var word = raw.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '')
  if (word && !/\s/.test(raw) && _bePlayHumanWord(word)) return true

  // Keep existing sentence playback as a browser fallback. This path is not
  // used for the 850 single-word pronunciation buttons.
  if (!_beHasBrowserSpeechApi()) {
    _beSpeechLastState = 'unsupported-for-sentence'
    _beSpeechLastError = 'browser-speech-api-unavailable'
    return false
  }

  var synth = window.speechSynthesis
  try {
    var u = new window.SpeechSynthesisUtterance(String(text))
    u.lang = 'en-US'
    u.rate = rate || 0.9
    u.volume = 1
    u.pitch = 1
    var v = _bePickEnglishVoice()
    if (v) u.voice = v
    u.onstart = function() {
      _beSpeechLastState = 'sentence-speaking'
      _beSpeechLastError = null
    }
    u.onend = function() {
      _beSpeechLastState = 'sentence-ended'
    }
    u.onerror = function(event) {
      _beSpeechLastState = 'sentence-error'
      _beSpeechLastError = event && event.error ? event.error : 'unknown'
      console.warn('[Basic English] Sentence speech error:', _beSpeechLastError)
    }
    if (synth.paused && typeof synth.resume === 'function') synth.resume()
    if (synth.speaking || synth.pending) synth.cancel()
    synth.speak(u)
    return true
  } catch (e) {
    _beSpeechLastState = 'sentence-error'
    _beSpeechLastError = String(e)
    console.warn('[Basic English] Sentence speech failed:', e)
    return false
  }
}

function isSpeechAvailable() {
  return typeof window.Audio === 'function' || _beHasBrowserSpeechApi()
}

function getSpeechDiagnostics() {
  return {
    humanWordAudio: typeof window.Audio === 'function',
    browserSentenceTTS: _beHasBrowserSpeechApi(),
    voiceCount: _beVoices.length,
    state: _beSpeechLastState,
    lastError: _beSpeechLastError
  }
}

window.BE = window.BE || {}
window.BE.speak = speak
window.BE.isSpeechAvailable = isSpeechAvailable
window.BE.getSpeechDiagnostics = getSpeechDiagnostics

document.addEventListener('DOMContentLoaded', _beInitSpeech)

// ---- INIT ----
document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('hashchange', function() {
    const page = location.hash.slice(1) || 'home'
    renderPage(page)
  })
  const initialPage = location.hash.slice(1) || 'home'
  renderPage(initialPage)
})
