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
// SPEECH SYNTHESIS (cross-browser)
// Use the browser's SpeechSynthesis API and let the OS select the
// matching voice from the utterance language when getVoices() is empty.
// An empty voice list is NOT proof that speech synthesis is unavailable:
// some Android/Chrome combinations populate it late or leave it empty.
// ============================================================
var _beVoices = []
var _beSpeechAvailable = false
var _beSpeechLastState = 'not-initialized'
var _beSpeechLastError = null

function _beHasSpeechApi() {
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

function _beLoadVoices() {
  if (!_beHasSpeechApi()) {
    _beVoices = []
    _beSetSpeechAvailable(false)
    return
  }

  try {
    _beVoices = window.speechSynthesis.getVoices() || []
  } catch (e) {
    // Voice enumeration can fail independently of the speak() API.
    _beVoices = []
  }

  // API presence is enough to attempt playback. If no explicit English
  // voice is listed, the utterance's en-US language is passed to the OS.
  _beSetSpeechAvailable(true)
}

function _beInitSpeech() {
  if (!_beHasSpeechApi()) {
    _beSpeechLastState = 'unsupported'
    _beSetSpeechAvailable(false)
    return
  }

  _beSetSpeechAvailable(true)
  _beLoadVoices()

  // Voice enumeration may complete asynchronously. This event is useful
  // for selecting an explicit English voice, but is not required to speak.
  var synth = window.speechSynthesis
  try {
    if (typeof synth.addEventListener === 'function') {
      synth.addEventListener('voiceschanged', _beLoadVoices)
    } else {
      synth.onvoiceschanged = _beLoadVoices
    }
  } catch (e) {
    // Keep the API enabled; getVoices()/voiceschanged are optional helpers.
  }
}

function _bePickEnglishVoice() {
  if (!_beVoices.length) _beLoadVoices()
  return _beVoices.find(function(v) { return /en[-_]US/i.test(v.lang) }) ||
         _beVoices.find(function(v) { return /^en/i.test(v.lang) }) ||
         null
}

function speak(text, rate) {
  if (!_beHasSpeechApi() || !text) {
    _beSpeechLastState = 'unsupported'
    _beSpeechLastError = 'speech-api-unavailable'
    _beSetSpeechAvailable(false)
    return false
  }

  var synth = window.speechSynthesis
  var speakNow = function() {
    try {
      var u = new window.SpeechSynthesisUtterance(String(text))
      u.lang = 'en-US'
      u.rate = rate || 0.9
      u.volume = 1
      u.pitch = 1

      // An explicit voice is optional. When getVoices() is empty, keep
      // voice unset so Android/Chrome can select its system en-US voice.
      var v = _bePickEnglishVoice()
      if (v) u.voice = v

      u.onstart = function() {
        _beSpeechLastState = 'speaking'
        _beSpeechLastError = null
      }
      u.onend = function() {
        _beSpeechLastState = 'ended'
      }
      u.onerror = function(event) {
        _beSpeechLastState = 'error'
        _beSpeechLastError = event && event.error ? event.error : 'unknown'
        console.warn('[Basic English] Speech synthesis error:', _beSpeechLastError)
      }

      _beSpeechLastState = 'queued'
      _beSpeechLastError = null
      synth.speak(u)
    } catch (e) {
      _beSpeechLastState = 'error'
      _beSpeechLastError = String(e)
      console.warn('[Basic English] Speech synthesis failed:', e)
    }
  }

  // Resume a paused Android/Chrome speech queue before submitting a new word.
  try {
    if (synth.paused && typeof synth.resume === 'function') synth.resume()
    if (synth.speaking || synth.pending) {
      synth.cancel()
      setTimeout(speakNow, 100)
    } else {
      speakNow()
    }
    return true
  } catch (e) {
    _beSpeechLastState = 'error'
    _beSpeechLastError = String(e)
    console.warn('[Basic English] Speech synthesis failed:', e)
    return false
  }
}

function isSpeechAvailable() {
  return _beHasSpeechApi()
}

function getSpeechDiagnostics() {
  return {
    supported: _beHasSpeechApi(),
    voiceCount: _beVoices.length,
    voices: _beVoices.map(function(v) {
      return { name: v.name, lang: v.lang, isDefault: !!v.default }
    }),
    state: _beSpeechLastState,
    lastError: _beSpeechLastError
  }
}

window.BE = window.BE || {}
window.BE.speak = speak
window.BE.isSpeechAvailable = isSpeechAvailable
window.BE.getSpeechDiagnostics = getSpeechDiagnostics

// Initialize speech support on DOMContentLoaded.
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
