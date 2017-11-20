"use strict";
(function () {
  var detectIEVersion = function () {
    var v = 4, div = document.createElement("div"), all = div.getElementsByTagName("i");
    while (div.innerHTML = "\x3c!--[if gt IE " + v + "]><i></i><![endif]--\x3e", all[0]) {
      v++
    }
    return v > 4 ? v : false
  };
  var _extend = function (dst, src) {
    for (var i in src) {
      if (Object.prototype.hasOwnProperty.call(src, i) && src[i]) {
        dst[i] = src[i]
      }
    }
  };
  var guid = function (len, radix) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r]
        }
      }
    }
    return uuid.join("")
  };
  var cookie = {};
  cookie.get = function (cname) {
    var name = cname + "";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return unescape(c.substring(name.length + 1, c.length))
      }
    }
    return ""
  };
  cookie.set = function (cname, cvalue, exdays) {
    var d = new Date;
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + escape(cvalue) + "; " + expires
  };
  var UA = {};
  (function (exports) {
    function detect(ua, platform) {
      var os = this.os = {}, browser = this.browser = {}, webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/), osx = !!ua.match(/\(Macintosh\; Intel /),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/), ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/), webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        win = /Win\d{2}|Windows/.test(platform), wp = ua.match(/Windows Phone ([\d.]+)/),
        touchpad = webos && ua.match(/TouchPad/), kindle = ua.match(/Kindle\/([\d.]+)/),
        silk = ua.match(/Silk\/([\d._]+)/), blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
        bb10 = ua.match(/(BB10).*Version\/([\d.]+)/), rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
        playbook = ua.match(/PlayBook/), chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
        firefox = ua.match(/Firefox\/([\d.]+)/),
        firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
        ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
        webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
        safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
      if (browser.webkit = !!webkit) browser.version = webkit[1];
      if (android) os.android = true, os.version = android[2];
      if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, ".");
      if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, ".");
      if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, ".") : null;
      if (wp) os.wp = true, os.version = wp[1];
      if (webos) os.webos = true, os.version = webos[2];
      if (touchpad) os.touchpad = true;
      if (blackberry) os.blackberry = true, os.version = blackberry[2];
      if (bb10) os.bb10 = true, os.version = bb10[2];
      if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
      if (playbook) browser.playbook = true;
      if (kindle) os.kindle = true, os.version = kindle[1];
      if (silk) browser.silk = true, browser.version = silk[1];
      if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
      if (chrome) browser.chrome = true, browser.version = chrome[1];
      if (firefox) browser.firefox = true, browser.version = firefox[1];
      if (firefoxos) os.firefoxos = true, os.version = firefoxos[1];
      if (ie) browser.ie = true, browser.version = ie[1];
      if (safari && (osx || os.ios || win || android)) {
        browser.safari = true;
        if (!os.ios) browser.version = safari[1]
      }
      if (webview) browser.webview = true;
      if (osx) {
        var version = ua.match(/[\d]*_[\d]*_[\d]*/);
        if (version && version.length > 0 && version[0]) {
          os.version = version[0].replace(/_/g, ".")
        }
      }
      os.tablet = !!(ipad || playbook || android && !ua.match(/Mobile/) || firefox && ua.match(/Tablet/) || ie && !ua.match(/Phone/) && ua.match(/Touch/));
      os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 || chrome && ua.match(/Android/) || chrome && ua.match(/CriOS\/([\d.]+)/) || firefox && ua.match(/Mobile/) || ie && ua.match(/Touch/)));
      os.pc = !os.tablet && !os.phone;
      os.name = this.getOSName();
      browser.name = this.getBrowserType()
    }

    exports.getOSName = function () {
      var sUserAgent = navigator.userAgent;
      var operator = "other", os = exports.os;
      if (!!os.ios) {
        return "iOS"
      }
      if (!!os.android) {
        return "Android"
      }
      var isWin = navigator.platform == "Win32" || navigator.platform == "Windows" || sUserAgent.indexOf("Windows") > -1;
      var isMac = navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel";
      if (isMac) operator = "Mac";
      var isUnix = navigator.platform == "X11" && !isWin && !isMac;
      if (isUnix) operator = "Unix";
      var isLinux = String(navigator.platform).indexOf("Linux") > -1;
      if (isLinux) operator = "Linux";
      if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) operator = "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) operator = "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) operator = "Win2003";
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) operator = "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) operator = "Win7";
        var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
        if (isWin8) operator = "Win8";
        var isWin81 = sUserAgent.indexOf("Windows NT 6.3") > -1 || sUserAgent.indexOf("Windows 8.1") > -1;
        if (isWin81) operator = "Win8.1";
        var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) operator = "Win10"
      }
      return operator
    };
    exports.getBrowserType = function () {
      var UserAgent = navigator.userAgent.toLowerCase(), browser = exports.browser;
      if (!!browser.chrome) {
        return "Chrome"
      } else if (!!browser.firefox) {
        return "Firefox"
      } else if (!!browser.safari) {
        return "Safari"
      } else if (!!browser.webview) {
        return "webview"
      } else if (!!browser.ie) {
        if (/Edge/.test(UserAgent)) return "Edge";
        return "IE"
      } else if (/Baiduspider/.test(UserAgent)) {
        return "Baiduspider"
      } else if (/ucweb/.test(UserAgent) || /UCBrowser/.test(UserAgent)) {
        return "UC"
      } else if (/opera/.test(UserAgent)) {
        return "Opera"
      } else if (/ucweb/.test(UserAgent)) {
        return "UC"
      } else if (/360se/.test(UserAgent)) {
        return "360浏览器"
      } else if (/bidubrowser/.test(UserAgent)) {
        return "百度浏览器"
      } else if (/metasr/.test(UserAgent)) {
        return "搜狗浏览器"
      } else if (/lbbrowser/.test(UserAgent)) {
        return "猎豹浏览器"
      } else if (/micromessenger/.test(UserAgent)) {
        return "微信内置浏览器"
      } else if (/qqbrowser/.test(UserAgent)) {
        return "QQ浏览器"
      }
    };
    exports.getHost = function (url) {
      var host = "";
      if (typeof url == "undefined" || url == null || url == "") {
        return ""
      }
      var regexStr = "^((https|http)?:?//)[^s]+/*";
      var result = url.match(regexStr);
      if (result != null) {
        host = result[0].replace(/https:\/\/|http:\/\/|\/\//g, "");
        var index = host.indexOf("/");
        if (index > 0) {
          host = host.substring(0, index)
        }
      }
      return host
    };
    detect.call(exports, navigator.userAgent, navigator.platform)
  })(UA);
  var getUuid = function () {
    var uuid = cookie.get("p_h5_upload_u");
    if (!uuid) {
      uuid = guid();
      cookie.set("p_h5_upload_u", uuid, 730)
    }
    return uuid
  };
  var log = function (e, params) {
    var osName = UA.os.name, osVersion = UA.os.version || "", exName = UA.browser.name,
      exVersion = UA.browser.version || "";
    var address = window.location.href, app_n = "";
    if (address) {
      app_n = UA.getHost(address)
    }
    var tt = "pc";
    if (UA.os.ipad) {
      tt = "pad"
    } else if (UA.os.iphone) {
      tt = "iphone"
    } else if (UA.os.android) {
      tt = "android"
    }
    var paramList = {
      t: (new Date).getTime(),
      APIVersion: "0.6.0",
      lv: "1",
      ll: e == "20006" ? "error" : "info",
      pd: "upload",
      sm: "upload",
      md: "uploader",
      ri: guid(),
      uuid: getUuid(),
      os: osName,
      ov: osVersion,
      et: exName,
      ev: exVersion,
      uat: navigator.userAgent,
      e: e,
      app_n: app_n,
      tt: tt,
      dm: "h5"
    };
    var vargs = [];
    if (params) {
      for (var key in params) {
        vargs.push(key + "=" + params[key])
      }
    }
    var argsStr = vargs.join("&");
    paramList.args = encodeURIComponent(argsStr == "" ? "0" : argsStr);
    var paramsArray = [];
    for (var key in paramList) {
      paramsArray.push(key + "=" + paramList[key])
    }
    var paramsString = paramsArray.join("&");
    var img = new Image(0, 0);
    img.src = "https://videocloud.cn-hangzhou.log.aliyuncs.com/logstores/upload/track?" + paramsString
  };
  var VODUploadError = {
    CODE: {
      SUCCESS: "Successful",
      EmptyValue: "InvalidParameter.EmptyValue",
      STSInvalid: "InvalidParameter.TokenInvalid",
      ReadFileError: "ReadFileError",
      FILEDUPLICATION: "FileDuplication",
      UploadALEADRYSTARTED: "UploadAlearyStarted"
    },
    MESSAGE: {
      SUCCESS: "Successful",
      EmptyValue: "参数 {0} 不能为空。",
      STSInvalid: "STS参数非法， accessKeyId、accessKeySecret、secretToken、expireTime都不能为空。",
      ReadFileError: "读取文件{0}{1}失败.",
      FILEDUPLICATION: "文件重复添加 {0}",
      UploadALEADRYSTARTED: "重复开始."
    },
    format: function (code) {
      if (arguments.length < 2) {
        return null
      }
      var str = arguments[1];
      for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        str = str.replace(re, arguments[i + 1])
      }
      return {code: code, message: str}
    }
  };

  function OssUpload(config) {
    if (!config) {
      return
    }
    this._config = {chunkSize: 1048576};
    _extend(this._config, config);
    if (!this._config.aliyunCredential && !this._config.stsToken) {
      return
    }
    if (!this._config.endpoint) {
      return
    }
    var ALY = window.ALY;
    if (this._config.stsToken) {
      this.oss = new ALY.OSS({
        accessKeyId: this._config.stsToken.Credentials.AccessKeyId,
        secretAccessKey: this._config.stsToken.Credentials.AccessKeySecret,
        securityToken: this._config.stsToken.Credentials.SecurityToken,
        endpoint: this._config.endpoint,
        apiVersion: "2013-10-15"
      })
    } else {
      this.oss = new ALY.OSS({
        accessKeyId: this._config.aliyunCredential.accessKeyId,
        secretAccessKey: this._config.aliyunCredential.secretAccessKey,
        endpoint: this._config.endpoint,
        apiVersion: "2013-10-15"
      })
    }
    this._uploadInfo = {};
    this._uploadInfo.state = undefined;
    this._uploadInfo.step = undefined
  }

  OssUpload.UPLOADSTATE = {INIT: "init", UPLOADING: "uploading", COMPLETE: "complete", INTERRUPT: "interrupt"};
  OssUpload.UPLOADSTEP = {INIT: "init", PART: "part", COMPLETE: "complete"};
  OssUpload.prototype.init = function (options) {
    var onerror = options.onerror;
    var errors = VODUploadError;
    if (!options) {
      if (typeof onerror == "function") {
        onerror(errors.format(VODUploadError.CODE.EmptyValue, VODUploadError.MESSAGE.EmptyValue, "options"))
      }
      return
    }
    if (!options.file) {
      if (typeof options.onerror == "function") {
        onerror(errors.format(VODUploadError.CODE.EmptyValue, VODUploadError.MESSAGE.EmptyValue, "file"))
      }
      return
    }
    if (!options.object) {
      if (typeof options.onerror == "function") {
        onerror(errors.format(VODUploadError.CODE.EmptyValue, VODUploadError.MESSAGE.EmptyValue, "object"))
      }
      return
    }
    options.object = options.object.replace(new RegExp("^/"), "");
    this._callback = {};
    this._callback.onerror = options.onerror;
    this._callback.oncomplete = options.oncomplete;
    this._callback.onprogress = options.onprogress;
    this._uploadInfo.file = options.file;
    this._uploadInfo.blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    this._uploadInfo.chunksNum = Math.ceil(options.file.size / this._config.chunkSize);
    this._uploadInfo.currentChunk = 0;
    this._uploadInfo.uploadId = undefined;
    this._uploadInfo.type = undefined;
    this._uploadInfo.multipartMap = {Parts: []};
    this._uploadInfo.connum = 0;
    this._uploadInfo.object = options.object;
    this._uploadInfo.headers = options.headers;
    this._uploadInfo.state = OssUpload.UPLOADSTATE.INIT;
    this._uploadInfo.step = OssUpload.UPLOADSTEP.INIT
  };
  OssUpload.prototype.oncomplete = function () {
    if (typeof this._callback.oncomplete == "function") {
      this._callback.oncomplete(this._uploadInfo.uploadId)
    }
  };
  OssUpload.prototype.onprogress = function () {
    var self = this;
    var multipartMap = self._uploadInfo.multipartMap;
    if (typeof this._callback.onprogress == "function") {
      var loaded = 0;
      for (var i = 0; i < multipartMap.Parts.length; i++) {
        loaded += multipartMap.Parts[i].loaded
      }
      self._callback.onprogress({loaded: loaded, total: this._uploadInfo.file.size})
    }
  };
  OssUpload.prototype.cancelUpload = function () {
    log("20008", {});
    this._uploadInfo.state = OssUpload.UPLOADSTATE.INTERRUPT
  };
  OssUpload.prototype.createMultipartUpload = function () {
    var self = this;
    var params = {
      Bucket: self._config.bucket,
      Key: self._uploadInfo.object,
      ContentType: ""
    };
    self._uploadInfo.state = OssUpload.UPLOADSTATE.START;
    self.oss.createMultipartUpload(params, function (err, res) {
      self.onCreateMultipartUpload(err, res)
    })
  };
  OssUpload.prototype.onCreateMultipartUpload = function (err, res) {
    var self = this;
    if (this._uploadInfo.state == OssUpload.UPLOADSTATE.INTERRUPT) {
      return
    }
    if (err) {
      log("20006", {code: err.code, message: err.message});
      if (err.code == "NetworkingError") {
        setTimeout(function () {
          self.createMultipartUpload()
        }, 1e3 * 2)
      } else {
        self._callback.onerror(err)
      }
      return
    }
    self._uploadInfo.uploadId = res.UploadId;
    self._uploadInfo.step = OssUpload.UPLOADSTEP.PART;
    self.loadChunk()
  };
  OssUpload.prototype.uploadPart = function (partNum) {
    var self = this;
    var multipartMap = self._uploadInfo.multipartMap;
    var partParams = {
      Body: multipartMap.Parts[partNum].data,
      Bucket: self._config.bucket,
      Key: self._uploadInfo.object,
      PartNumber: String(partNum + 1),
      UploadId: self._uploadInfo.uploadId
    };
    log("20005", {
      ft: "video",
      fs: self._uploadInfo.file.size,
      ps: self._config.chunkSize,
      bu: self._config.bucket,
      ok: self._uploadInfo.object
    });
    var req = self.oss.uploadPart(partParams, function (err, data) {
      self.onUploadPart(partNum, err, data)
    });
    req.on("httpUploadProgress", function (p) {
      multipartMap.Parts[partNum].loaded = p.loaded;
      self.onprogress()
    })
  };
  OssUpload.prototype.onUploadPart = function (partNum, err, data) {
    var self = this;
    var _uploadInfo = this._uploadInfo;
    var multipartMap = self._uploadInfo.multipartMap;
    if (this._uploadInfo.state == OssUpload.UPLOADSTATE.INTERRUPT) {
      return
    }
    if (err) {
      log("20006", {code: err.code, message: err.message});
      if (err.code == "NetworkingError") {
        multipartMap.Parts[partNum].loaded = 0;
        setTimeout(function () {
          self.uploadPart(partNum)
        }, 1e3 * 2)
      } else {
        if (self._uploadInfo.state == OssUpload.UPLOADSTATE.INTERRUPT) {
          return
        }
        _uploadInfo.state = OssUpload.UPLOADSTATE.INTERRUPT;
        self._callback.onerror(err, data)
      }
      return
    }
    multipartMap.Parts[partNum].ETag = data.ETag;
    multipartMap.Parts[partNum].loaded = multipartMap.Parts[partNum].data.byteLength;
    delete multipartMap.Parts[partNum].data;
    log("20007");
    if (_uploadInfo.currentChunk < _uploadInfo.chunksNum) {
      self.loadChunk()
    } else {
      if (self._uploadInfo.connum == 0 && multipartMap.Parts.length == _uploadInfo.chunksNum) {
        self._uploadInfo.step = OssUpload.UPLOADSTEP.COMPLETE;
        self.completeMultipartUpload()
      }
    }
  };
  OssUpload.prototype.completeMultipartUpload = function () {
    var self = this;
    var multipartMap = self._uploadInfo.multipartMap;
    for (var i in multipartMap.Parts) {
      if (multipartMap.Parts[i].loaded) {
        delete multipartMap.Parts[i].loaded
      }
    }
    var doneParams = {
      Bucket: self._config.bucket,
      Key: self._uploadInfo.object,
      CompleteMultipartUpload: multipartMap,
      UploadId: self._uploadInfo.uploadId
    };
    _extend(doneParams, self._uploadInfo.headers);
    this.oss.completeMultipartUpload(doneParams, function (err, res) {
      self.onMultiUploadComplete(err, res)
    })
  };
  OssUpload.prototype.onMultiUploadComplete = function (err, res) {
    var self = this;
    if (this._uploadInfo.state == OssUpload.UPLOADSTATE.INTERRUPT) {
      return
    }
    if (err) {
      if (typeof self._callback.onerror == "function") {
        if (err) {
          if (err.code == "NetworkingError") {
            setTimeout(function () {
              self.completeMultipartUpload()
            }, 1e3 * 2)
          } else {
            self._callback.onerror(err)
          }
        } else {
          console.log("onMultiUploadComplete: error msg is null.")
        }
        return
      }
      return
    }
    if (typeof self._callback.oncomplete == "function") {
      self._uploadInfo.state = OssUpload.UPLOADSTATE.COMPLETE;
      self._callback.oncomplete(res)
    }
  };
  OssUpload.prototype.loadChunk = function () {
    var self = this;
    var _uploadInfo = self._uploadInfo;
    var config = self._config;
    var currentChunk = _uploadInfo.currentChunk;
    var fileReader = new FileReader;
    fileReader.onload = function (e) {
      self.frOnload(currentChunk, e)
    };
    fileReader.onerror = function (e) {
      self.frOnerror(currentChunk, e)
    };
    var start = currentChunk * config.chunkSize;
    var end = start + config.chunkSize >= _uploadInfo.file.size ? _uploadInfo.file.size : start + config.chunkSize;
    var blobPacket = _uploadInfo.blobSlice.call(_uploadInfo.file, start, end);
    fileReader.readAsArrayBuffer(blobPacket);
    _uploadInfo.currentChunk++
  };
  OssUpload.prototype.frOnload = function (current, e) {
    var self = this;
    var _uploadInfo = self._uploadInfo;
    _uploadInfo.multipartMap.Parts[current] = {data: e.target.result, PartNumber: current + 1, loaded: 0};
    if (this._uploadInfo.state == OssUpload.UPLOADSTATE.INTERRUPT) {
      return
    }
    self.uploadPart(current)
  };
  OssUpload.prototype.frOnerror = function (current, e) {
    var self = this;
    var onerror = self._callback.onerror;
    var errors = self._config.errors;
    var _uploadInfo = self._uploadInfo;
    if (typeof onerror == "function") {
      onerror(errors.format(errors.CODE.ReadFileError, errors.MESSAGE.ReadFileError, _uploadInfo.file.name, current))
    }
  };
  OssUpload.prototype.resumeUploadWithToken = function (accessKeyId, accessKeySecret, securityToken) {
    var self = this;
    var multipartMap = self._uploadInfo.multipartMap;
    if (self._uploadInfo.state != OssUpload.UPLOADSTATE.INTERRUPT) {
      return
    }
    self._config.stsToken.Credentials.AccessKeyId = accessKeyId;
    self._config.stsToken.Credentials.AccessKeySecret = accessKeySecret;
    self._config.stsToken.Credentials.SecurityToken = securityToken;
    var ALY = window.ALY;
    if (self._config.stsToken) {
      self.oss = new ALY.OSS({
        accessKeyId: self._config.stsToken.Credentials.AccessKeyId,
        secretAccessKey: self._config.stsToken.Credentials.AccessKeySecret,
        securityToken: self._config.stsToken.Credentials.SecurityToken,
        endpoint: self._config.endpoint,
        apiVersion: "2013-10-15"
      })
    } else {
      self.oss = new ALY.OSS({
        accessKeyId: self._config.aliyunCredential.accessKeyId,
        secretAccessKey: self._config.aliyunCredential.secretAccessKey,
        endpoint: self._config.endpoint,
        apiVersion: "2013-10-15"
      })
    }
    self._uploadInfo.state = OssUpload.UPLOADSTATE.UPLOADING;
    if (self._uploadInfo.step == OssUpload.UPLOADSTEP.INIT) {
      self.createMultipartUpload()
    } else if (self._uploadInfo.step == OssUpload.UPLOADSTEP.PART) {
      for (var i in multipartMap.Parts) {
        if (multipartMap.Parts[i].data) {
          self.uploadPart(parseInt(i));
          break
        }
      }
    } else if (self._uploadInfo.step == OssUpload.UPLOADSTEP.COMPLETE) {
      self.completeMultipartUpload()
    }
  };
  OssUpload.prototype.resumeUpload = function () {
    var self = this;
    var multipartMap = self._uploadInfo.multipartMap;
    if (self._uploadInfo.state != OssUpload.UPLOADSTATE.INTERRUPT) {
      return
    }
    self._uploadInfo.state = OssUpload.UPLOADSTATE.UPLOADING;
    if (self._uploadInfo.step == OssUpload.UPLOADSTEP.INIT) {
      self.createMultipartUpload()
    } else if (self._uploadInfo.step == OssUpload.UPLOADSTEP.PART) {
      for (var i in multipartMap.Parts) {
        if (multipartMap.Parts[i].data) {
          self.uploadPart(parseInt(i));
          break
        }
      }
    } else if (self._uploadInfo.step == OssUpload.UPLOADSTEP.COMPLETE) {
      self.completeMultipartUpload()
    }
  };
  OssUpload.prototype.upload = function () {
    this._uploadInfo.state = OssUpload.UPLOADSTATE.START;
    this.createMultipartUpload()
  };
  var VODUpload = function (options) {
    this.options = options;
    this.initialize()
  };
  VODUpload.UPLOADSTATE = {
    INIT: "Ready",
    UPLOADING: "Uploading",
    SUCCESS: "Success",
    FAIlURE: "Failure",
    CANCELED: "Canceled",
    STOPED: "Stoped"
  };
  VODUpload.VODSTATE = {INIT: "Init", START: "Start", STOP: "Stop", FAILURE: "Failure", EXPIRE: "Expire", END: "End"};
  VODUpload.prototype = {
    constructor: VODUpload, initialize: function () {
      this.options.uploadList = [];
      this.options.oss = new Object;
      this.options.curIndex = null;
      this.options.state = VODUpload.VODSTATE.INIT
    }, init: function (accessKeyId, accessKeySecret, securityToken, expireTime) {
      if (securityToken && !expireTime || !securityToken && expireTime) {
        return false
      }
      if (accessKeyId && !accessKeySecret || !accessKeyId && accessKeySecret) {
        return false
      }
      var options = this.options;
      options.oss.accessKeyId = accessKeyId;
      options.oss.accessKeySecret = accessKeySecret;
      options.oss.securityToken = securityToken;
      options.oss.expireTime = expireTime;
      for (var i = 0; i < options.uploadList.length; i++) {
        if (options.uploadList[i].state == VODUpload.UPLOADSTATE.FAIlURE) {
          options.uploadList[i].state = VODUpload.UPLOADSTATE.INIT
        }
      }
      return true
    }, addFile: function (file, endpoint, bucket, object, userData) {
      if (!file) {
        return false
      }
      var options = this.options;
      for (var i = 0; i < options.uploadList.length; i++) {
        if (options.uploadList[i].file == file) {
          return false
        }
      }
      var uploadObject = new Object;
      uploadObject.file = file;
      uploadObject.endpoint = endpoint;
      uploadObject.bucket = bucket;
      uploadObject.object = object;
      uploadObject.state = VODUpload.UPLOADSTATE.INIT;
      uploadObject.userData = ALY.util.base64.encode(userData);
      var self = this;
      uploadObject.reload = function () {
        if (this.state == VODUpload.UPLOADSTATE.CANCELED || this.state == VODUpload.UPLOADSTATE.FAIlURE) {
          this.state = VODUpload.UPLOADSTATE.INIT
        }
        self.options.curIndex = undefined;
        self.nextUpload()
      };
      uploadObject.cancel = function () {
        self.cancelFile(uploadObject.file)
      };
      self.options.uploadList.push(uploadObject);
      log("20001", {ql: self.options.uploadList.length});
      return true
    }, deleteFile: function (index) {
      if (this.cancelFile(index)) {
        this.options.uploadList.splice(index, 1);
        return true
      }
      return false
    }, cleanList: function () {
      this.stopUpload();
      this.options.uploadList.length = 0
    }, cancelFile: function (index) {
      var options = this.options;
      if (index < 0 || index >= options.uploadList.length) {
        return false
      }
      if (index == options.curIndex && options.uploadList[index].state == VODUpload.UPLOADSTATE.UPLOADING) {
        options.uploadList[index].state = VODUpload.UPLOADSTATE.CANCELED;
        this.options.ossUpload.cancelUpload();
        this.nextUpload()
      } else if (options.uploadList[index].state != VODUpload.UPLOADSTATE.SUCCESS) {
        options.uploadList[index].state = VODUpload.UPLOADSTATE.CANCELED
      }
      return true
    }, resumeFile: function (index) {
      var options = this.options;
      if (index < 0 || index >= options.uploadList.length) {
        return false
      }
      if (options.uploadList[index].state != VODUpload.UPLOADSTATE.CANCELED) {
        return false
      }
      options.uploadList[index].state = VODUpload.UPLOADSTATE.INIT;
      return true
    }, listFiles: function () {
      return this.options.uploadList
    }, startUpload: function () {
      var options = this.options;
      if (this.options.state == VODUpload.VODSTATE.START || this.options.state == VODUpload.VODSTATE.EXPIRE) {
        return
      } else if (this.options.state == VODUpload.VODSTATE.STOP) {
        if (options && options.ossUpload && null != options.curIndex && options.uploadList[options.curIndex] && options.uploadList[options.curIndex].state == VODUpload.UPLOADSTATE.STOPED) {
          options.uploadList[options.curIndex].state = VODUpload.UPLOADSTATE.UPLOADING;
          options.ossUpload.resumeUpload();
          this.options.state = VODUpload.VODSTATE.START;
          return
        }
      }
      options.curIndex = null;
      for (var i = 0; i < options.uploadList.length; i++) {
        if (options.uploadList[i].state == VODUpload.UPLOADSTATE.INIT) {
          options.curIndex = i;
          break
        }
      }
      if (null == options.curIndex) {
        this.options.state = VODUpload.VODSTATE.END;
        return
      }
      var curObject = options.uploadList[options.curIndex];
      if (options.onUploadstarted) {
        options.onUploadstarted(curObject)
      }
      curObject.state = VODUpload.UPLOADSTATE.UPLOADING;
      var endpoint = curObject.endpoint || "http://oss-cn-hangzhou.aliyuncs.com";
      var ossUpload;
      if (!options.oss.securityToken) {
        ossUpload = new OssUpload({
          bucket: curObject.bucket,
          endpoint: endpoint,
          chunkSize: 1048576,
          concurrency: 1,
          aliyunCredential: {accessKeyId: options.oss.accessKeyId, secretAccessKey: options.oss.accessKeySecret}
        })
      } else {
        ossUpload = new OssUpload({
          bucket: curObject.bucket,
          endpoint: endpoint,
          chunkSize: 1048576,
          concurrency: 1,
          stsToken: {
            Credentials: {
              AccessKeyId: options.oss.accessKeyId,
              AccessKeySecret: options.oss.accessKeySecret,
              SecurityToken: options.oss.securityToken
            }
          }
        })
      }
      options.ossUpload = ossUpload;
      var self = this;
      log("20002", {ft: "video", fs: curObject.file.size, bu: curObject.bucket, ok: curObject.object});
      ossUpload.init({
        file: curObject.file, object: curObject.object, maxRetry: 3, onerror: function (evt) {
          if (evt.code == "SecurityTokenExpired" || evt.code == "InvalidAccessKeyId" && options.oss.secretToken && options.oss.secretToken.length > 0) {
            options.state = VODUpload.VODSTATE.EXPIRE;
            if (options.onUploadTokenExpired) {
              options.onUploadTokenExpired(self)
            }
          } else {
            if (curObject.state != VODUpload.UPLOADSTATE.CANCELED) {
              curObject.state = VODUpload.UPLOADSTATE.FAIlURE;
              if (options.onUploadFailed) {
                if (evt && evt.code && evt.message) {
                  options.onUploadFailed(curObject, evt.code, evt.message)
                }
              }
            }
            options.state = VODUpload.VODSTATE.FAILURE
          }
          log("20004")
        }, oncomplete: function (res) {
          curObject.state = VODUpload.UPLOADSTATE.SUCCESS;
          if (options.onUploadSucceed) {
            options.onUploadSucceed(curObject)
          }
          log("20003");
          setTimeout(function () {
            self.nextUpload()
          }, 100)
        }, onprogress: function (option) {
          if (options.onUploadProgress) {
            options.onUploadProgress(curObject, option.total, option.loaded)
          }
        }, headers: {Notification: curObject.userData}
      });
      ossUpload.upload();
      this.options.state = VODUpload.VODSTATE.START
    }, nextUpload: function () {
      var options = this.options;
      if (this.options.state != VODUpload.VODSTATE.START) {
        return
      }
      options.curIndex = null;
      for (var i = 0; i < options.uploadList.length; i++) {
        if (options.uploadList[i].state == VODUpload.UPLOADSTATE.INIT) {
          options.curIndex = i;
          break
        }
      }
      if (null == options.curIndex) {
        this.options.state = VODUpload.VODSTATE.END;
        return
      }
      var curObject = options.uploadList[options.curIndex];
      if (options.onUploadstarted) {
        options.onUploadstarted(curObject)
      }
      curObject.state = VODUpload.UPLOADSTATE.UPLOADING;
      var endpoint = curObject.endpoint || "http://oss-cn-hangzhou.aliyuncs.com";
      var ossUpload;
      if (!options.oss.securityToken) {
        ossUpload = new OssUpload({
          bucket: curObject.bucket,
          endpoint: endpoint,
          chunkSize: 1048576,
          concurrency: 1,
          aliyunCredential: {accessKeyId: options.oss.accessKeyId, secretAccessKey: options.oss.accessKeySecret}
        })
      } else {
        ossUpload = new OssUpload({
          bucket: curObject.bucket,
          endpoint: endpoint,
          chunkSize: 1048576,
          concurrency: 1,
          stsToken: {
            Credentials: {
              AccessKeyId: options.oss.accessKeyId,
              AccessKeySecret: options.oss.accessKeySecret,
              SecurityToken: options.oss.securityToken
            }
          }
        })
      }
      options.ossUpload = ossUpload;
      var self = this;
      log("20002", {ft: "video", fs: curObject.file.size, bu: curObject.bucket, ok: curObject.object});
      ossUpload.init({
        file: curObject.file, object: curObject.object, maxRetry: 3, onerror: function (evt) {
          if (evt.code == "SecurityTokenExpired" || evt.code == "InvalidAccessKeyId" && options.oss.secretToken && options.oss.secretToken.length > 0) {
            if (options.onUploadTokenExpired) {
              options.state = VODUpload.VODSTATE.EXPIRE;
              options.onUploadTokenExpired(self)
            }
          } else {
            if (curObject.state != VODUpload.UPLOADSTATE.CANCELED) {
              curObject.state = VODUpload.UPLOADSTATE.FAIlURE;
              if (options.onUploadFailed) {
                if (evt && evt.code && evt.message) {
                  options.onUploadFailed(curObject, evt.code, evt.message)
                }
              }
            }
            options.state = VODUpload.VODSTATE.FAILURE
          }
          log("20004")
        }, oncomplete: function (res) {
          curObject.state = VODUpload.UPLOADSTATE.SUCCESS;
          if (options.onUploadSucceed) {
            options.onUploadSucceed(curObject)
          }
          setTimeout(function () {
            self.nextUpload()
          }, 100);
          log("20003")
        }, onprogress: function (option) {
          if (options.onUploadProgress) {
            options.onUploadProgress(curObject, option.total, option.loaded)
          }
        }, headers: {Notification: curObject.userData}
      });
      ossUpload.upload()
    }, clear: function (state) {
      var options = this.options;
      var num = 0;
      for (var i = 0; i < options.uploadList.length; i++) {
        if (options.uploadList[i].state == VODUpload.UPLOADSTATE.SUCCESS) {
          num++
        }
        if (options.uploadList[i].state == state) {
          options.uploadList.splice(i, 1);
          i--
        }
      }
      if (options.onClear) {
        options.onClear(options.uploadList.length, num)
      }
    }, stopUpload: function () {
      if (this.options.state != VODUpload.VODSTATE.START && this.options.state != VODUpload.VODSTATE.FAILURE) {
        return
      }
      this.options.ossUpload.cancelUpload();
      this.options.state = VODUpload.VODSTATE.STOP;
      this.options.uploadList[this.options.curIndex].state = VODUpload.UPLOADSTATE.STOPED
    }, resumeUploadWithAuth: function (uploadAuth) {
      var self = this;
      if (!uploadAuth) {
        return false
      }
      var key = JSON.parse(ALY.util.base64.decode(uploadAuth));
      if (!key.AccessKeyId || !key.AccessKeySecret || !key.SecurityToken || !key.Expiration) {
        return false
      }
      return self.resumeUploadWithToken(key.AccessKeyId, key.AccessKeySecret, key.SecurityToken, key.Expiration)
    }, resumeUploadWithToken: function (accessKeyId, accessKeySecret, securityToken, expireTime) {
      var options = this.options;
      if (!accessKeyId || !accessKeySecret || !securityToken || !expireTime) {
        return false
      }
      if (this.options.state != VODUpload.VODSTATE.EXPIRE) {
        return false
      }
      this.init(accessKeyId, accessKeySecret, securityToken, expireTime);
      options.ossUpload.resumeUploadWithToken(accessKeyId, accessKeySecret, securityToken);
      this.options.state = VODUpload.VODSTATE.START;
      return true
    }, setUploadAuthAndAddress: function (uploadInfo, uploadAuth, uploadAddress) {
      if (!uploadInfo || !uploadAuth || !uploadAddress) {
        return false
      }
      var authKey = JSON.parse(ALY.util.base64.decode(uploadAuth));
      if (!authKey.AccessKeyId || !authKey.AccessKeySecret || !authKey.SecurityToken || !authKey.Expiration) {
        return false
      }
      var addressKey = JSON.parse(ALY.util.base64.decode(uploadAddress));
      if (!addressKey.Endpoint || !addressKey.Bucket || !addressKey.FileName) {
        return false
      }
      var curObject = uploadInfo;
      this.options.oss.accessKeyId = authKey.AccessKeyId;
      this.options.oss.accessKeySecret = authKey.AccessKeySecret;
      this.options.oss.securityToken = authKey.SecurityToken;
      this.options.oss.expireTime = authKey.Expiration;
      curObject.endpoint = addressKey.Endpoint;
      curObject.bucket = addressKey.Bucket;
      curObject.object = addressKey.FileName
    }
  };
  window.VODUpload = VODUpload
})();
