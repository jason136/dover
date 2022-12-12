/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".bootstrap.js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"../pkg/dover_bg.wasm": function() {
/******/ 			return {
/******/ 				"./dover_bg.js": {
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbindgen_object_drop_ref"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbindgen_object_clone_ref"](p0i32);
/******/ 					},
/******/ 					"__wbg_height_a81d308a000d91d0": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_height_a81d308a000d91d0"](p0i32);
/******/ 					},
/******/ 					"__wbg_width_2f4b0cbbf1c850d9": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_width_2f4b0cbbf1c850d9"](p0i32);
/******/ 					},
/******/ 					"__wbg_beginPath_4e91b7092d0d33d9": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_beginPath_4e91b7092d0d33d9"](p0i32);
/******/ 					},
/******/ 					"__wbg_setstrokeStyle_899ea3720dae323b": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_setstrokeStyle_899ea3720dae323b"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_moveTo_15a09390bee05586": function(p0i32,p1f64,p2f64) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_moveTo_15a09390bee05586"](p0i32,p1f64,p2f64);
/******/ 					},
/******/ 					"__wbg_lineTo_dbe49320dd6e392a": function(p0i32,p1f64,p2f64) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_lineTo_dbe49320dd6e392a"](p0i32,p1f64,p2f64);
/******/ 					},
/******/ 					"__wbg_stroke_85dee7d87c4a6ead": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_stroke_85dee7d87c4a6ead"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_error_new": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbindgen_error_new"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_setfillStyle_53ccf2a9886c1c4d": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_setfillStyle_53ccf2a9886c1c4d"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_fillRect_c7a19e13c5242507": function(p0i32,p1f64,p2f64,p3f64,p4f64) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_fillRect_c7a19e13c5242507"](p0i32,p1f64,p2f64,p3f64,p4f64);
/******/ 					},
/******/ 					"__wbg_instanceof_Window_acc97ff9f5d2c7b4": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_instanceof_Window_acc97ff9f5d2c7b4"](p0i32);
/******/ 					},
/******/ 					"__wbg_document_3ead31dbcad65886": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_document_3ead31dbcad65886"](p0i32);
/******/ 					},
/******/ 					"__wbg_body_3cb4b4042b9a632b": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_body_3cb4b4042b9a632b"](p0i32);
/******/ 					},
/******/ 					"__wbg_createElement_976dbb84fe1661b5": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_createElement_976dbb84fe1661b5"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_settextContent_538ceb17614272d8": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_settextContent_538ceb17614272d8"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_setAttribute_d8436c14a59ab1af": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_setAttribute_d8436c14a59ab1af"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__wbg_append_0c27b52e81ef3062": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_append_0c27b52e81ef3062"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_instanceof_HtmlElement_eff00d16af7bd6e7": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_instanceof_HtmlElement_eff00d16af7bd6e7"](p0i32);
/******/ 					},
/******/ 					"__wbg_offsetHeight_3099b53c020bbd40": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_offsetHeight_3099b53c020bbd40"](p0i32);
/******/ 					},
/******/ 					"__wbg_offsetWidth_8906f5432e06a269": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_offsetWidth_8906f5432e06a269"](p0i32);
/******/ 					},
/******/ 					"__wbg_remove_a8fdc690909ea566": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_remove_a8fdc690909ea566"](p0i32);
/******/ 					},
/******/ 					"__wbg_setlineWidth_64004648773fed7a": function(p0i32,p1f64) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_setlineWidth_64004648773fed7a"](p0i32,p1f64);
/******/ 					},
/******/ 					"__wbg_save_a9bb370fb49c5df7": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_save_a9bb370fb49c5df7"](p0i32);
/******/ 					},
/******/ 					"__wbg_translate_ee7d176c35f20054": function(p0i32,p1f64,p2f64) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_translate_ee7d176c35f20054"](p0i32,p1f64,p2f64);
/******/ 					},
/******/ 					"__wbg_rotate_4ee681cf0dd9841a": function(p0i32,p1f64) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_rotate_4ee681cf0dd9841a"](p0i32,p1f64);
/******/ 					},
/******/ 					"__wbg_settextBaseline_d33235cd2782235c": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_settextBaseline_d33235cd2782235c"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_settextAlign_2ec9d955460e13ca": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_settextAlign_2ec9d955460e13ca"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_setfont_f55835290596888e": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_setfont_f55835290596888e"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_fillText_e5b1cef36b742bcc": function(p0i32,p1i32,p2i32,p3f64,p4f64) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_fillText_e5b1cef36b742bcc"](p0i32,p1i32,p2i32,p3f64,p4f64);
/******/ 					},
/******/ 					"__wbg_restore_556d7c38c007b3fe": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_restore_556d7c38c007b3fe"](p0i32);
/******/ 					},
/******/ 					"__wbg_self_6d479506f72c6a71": function() {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_self_6d479506f72c6a71"]();
/******/ 					},
/******/ 					"__wbg_window_f2557cc78490aceb": function() {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_window_f2557cc78490aceb"]();
/******/ 					},
/******/ 					"__wbg_globalThis_7f206bda628d5286": function() {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_globalThis_7f206bda628d5286"]();
/******/ 					},
/******/ 					"__wbg_global_ba75c50d1cf384f4": function() {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_global_ba75c50d1cf384f4"]();
/******/ 					},
/******/ 					"__wbindgen_is_undefined": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbindgen_is_undefined"](p0i32);
/******/ 					},
/******/ 					"__wbg_newnoargs_b5b063fc6c2f0376": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_newnoargs_b5b063fc6c2f0376"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_call_97ae9d8645dc388b": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_call_97ae9d8645dc388b"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbindgen_debug_string"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_stringify_d6471d300ded9b68": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_stringify_d6471d300ded9b68"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_string_get": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbindgen_string_get"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_getContext_4d5e97892c1b206a": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_getContext_4d5e97892c1b206a"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_instanceof_CanvasRenderingContext2d_ff80c06d296e3622": function(p0i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbg_instanceof_CanvasRenderingContext2d_ff80c06d296e3622"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbindgen_string_new"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/dover_bg.js"].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":["../pkg/dover_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"../pkg/dover_bg.wasm":"2b56e2b5965d6dc9f8d0"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./bootstrap.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bootstrap.js":
/*!**********************!*\
  !*** ./bootstrap.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("init();\r\n\r\nasync function init() {\r\n    const [{Chart}, {main, setup}] = await Promise.all([\r\n        __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../pkg/dover.js */ \"../pkg/dover.js\")),\r\n        __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./index.js */ \"./index.js\")),\r\n    ]);\r\n\r\n    setup(Chart);\r\n    main();\r\n}\n\n//# sourceURL=webpack:///./bootstrap.js?");

/***/ })

/******/ });