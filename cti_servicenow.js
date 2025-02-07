/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SNExampleCTIDriverAccenture.ts":
/*!********************************************!*\
  !*** ./src/SNExampleCTIDriverAccenture.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n//import { GlideRecord, GlideElement } from '@nuvolo/servicenow-types';\n// interface MyTableContact {\n//     sys_id: GlideElement;\n//     firstName: GlideElement;\n//     phone: GlideElement;\n//   }\n//   interface MyTableCase {\n//     contact: ReferenceGlideElement<MyTableContact>;\n//     short_description: GlideElement;\n//   }\nclass SNExampleCTIDriver {\n    constructor(ccaaSSDKInstance) {\n        if (!ccaaSSDKInstance) {\n            throw new Error('ccaaSSDKInstance cannot be null or undefined');\n        }\n        this.ccaaSSDKInstance = ccaaSSDKInstance;\n    }\n    initialize() {\n        let isServiceNowPresent = typeof window.openFrameAPI !== 'undefined';\n        if (!isServiceNowPresent) {\n            const openCTIurlPath = `/scripts/openframe/latest/openFrameAPI.min.js`;\n            const servicenoworgdomain = window.location.ancestorOrigins[0];\n            const source = `${servicenoworgdomain}${openCTIurlPath}`;\n            return SNExampleCTIDriver.loadScript(source);\n        }\n        return Promise.resolve(true);\n    }\n    setSoftPhonePanelWidth(width) {\n        window.openFrameAPI.setWidth(width);\n    }\n    setSoftPhonePanelHeight(height) {\n        window.openFrameAPI.setHeight(height);\n    }\n    setSoftPhonePanelVisibility(visible) {\n        if (visible) {\n            window.openFrameAPI.show();\n        }\n        else {\n            window.openFrameAPI.hide();\n        }\n    }\n    searchForRecords(searchParam) {\n        return __awaiter(this, void 0, void 0, function* () {\n            console.log(\"SearchForRecords, searchParam: \" + searchParam);\n            return new Promise((resolve, reject) => {\n                window.openFrameAPI.search({\n                    type: \"customer\",\n                    searchString: searchParam,\n                    callback: (response) => {\n                        if (response.success && response.records.length > 0) {\n                            resolve(response.records[0].id);\n                        }\n                        else {\n                            resolve(null);\n                        }\n                    }\n                });\n            });\n        });\n    }\n    conversationReady(conversationData) {\n        return __awaiter(this, void 0, void 0, function* () {\n            console.log(\"ConversationReady\");\n            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {\n                if (!conversationData || !conversationData.customerData) {\n                    reject(new Error('Customer data for search is missing'));\n                    return;\n                }\n                try {\n                    const searchParam = conversationData.customerData.phonenumber || conversationData.customerData.email || conversationData.customerData.name;\n                    if (!searchParam) {\n                        reject(new Error('No valid search parameter found'));\n                        return;\n                    }\n                    console.log(\"ConversationReady, SearchParam: \" + searchParam);\n                    var query = 'phone=' + searchParam;\n                    var queryContact = 'mobile_phone=' + searchParam;\n                    var queryDetails = {\n                        entity: \"customer_contact\",\n                        query: \"phone=\" + searchParam\n                    };\n                    // var contact = new GlideRecord<MyTableContact>('customer_contact');\n                    // contact.addQuery('phone', searchParam);\n                    // contact.query();\n                    // if (contact.next()) {\n                    //     var caseRecord = new GlideRecord<MyTableCase>('sn_customerservice_case');\n                    //     caseRecord.initialize();\n                    //     caseRecord.contact = contact.sys_id;\n                    //     caseRecord.short_description = \"test record 2 sys_id\";\n                    //     caseRecord.insert();\n                    // }\n                    //console.log(\"ConversationReady, Query: \" + queryDetails);\n                    //(window as any).openFrameAPI.openServiceNowForm(queryDetails);\n                    let sysId = \"\";\n                    if (searchParam == '+421904470391')\n                        sysId = 'a883b31f831312100b1de970deaad358';\n                    if (searchParam == '+36306037957')\n                        sysId = 'af8992c1836b12100b1de970deaad36d';\n                    if (searchParam == '+14258308355')\n                        sysId = '06ce47c583ef12100b1de970deaad341';\n                    if (searchParam == '+12155207401')\n                        sysId = '5694db1983ef92100b1de970deaad30c';\n                    if (searchParam == '+919999440377')\n                        sysId = 'a6c4171983ef92100b1de970deaad3ad';\n                    var queryDetailsSys = {\n                        entity: \"customer_contact\",\n                        query: \"sys_id=\" + sysId\n                    };\n                    window.openFrameAPI.openServiceNowForm(queryDetailsSys);\n                    // console.log(\"ConversationReady, openServiceNowForm: \" + result);\n                    // var result2 = (window as any).openFrameAPI.openServiceNowForm({entity:'customer_account', query: 'sysparm_query=' + query});\n                    // console.log(\"ConversationReady, openServiceNowForm2: \" + result2);\n                    // var result3 = (window as any).openFrameAPI.openServiceNowForm({entity:'customer_contact', query: 'sysparm_query=' + queryContact});\n                    // console.log(\"ConversationReady, openServiceNowForm2: \" + result3);\n                    // const accountId = await this.searchForRecords(searchParam);\n                    // if (accountId) {\n                    //     console.log(\"ConversationReady, AccountId: \" + accountId);\n                    //     (window as any).openFrameAPI.screenPop({\n                    //         type: \"customer\",\n                    //         recordId: accountId\n                    //     });\n                    //     resolve();\n                    // } else {\n                    //     console.log(\"ConversationReady, No record found!\");\n                    //     reject(new Error('No matching records found'));\n                    // }\n                }\n                catch (error) {\n                    reject(error);\n                }\n            }));\n        });\n    }\n    endConversation(conversationId) {\n        if (!conversationId) {\n            throw new Error('Invalid conversation ID');\n        }\n        window.openFrameAPI.endSession();\n    }\n    onClickToDial(callbackFunction) {\n        window.openFrameAPI.on('clickToDial', (payload) => {\n            if (payload && payload.number) {\n                const dialPayload = {\n                    number: payload.number,\n                    objectType: payload.objectType || '',\n                    recordId: payload.recordId || '',\n                    recordName: payload.recordName || ''\n                };\n                callbackFunction(dialPayload);\n            }\n        });\n    }\n    static loadScript(source) {\n        return new Promise((resolve, reject) => {\n            const script = document.createElement('script');\n            script.type = 'text/javascript';\n            script.async = true;\n            script.src = source;\n            script.onload = function () {\n                resolve(true);\n            };\n            script.onerror = function () {\n                reject(new Error(`Error in loading ${source}`));\n            };\n            document.getElementsByTagName('head')[0].appendChild(script);\n        });\n    }\n}\nwindow.CCaaS = window.CCaaS || {};\nif (!window.CCaaS.CTIDriver) {\n    window.CCaaS.CTIDriver = SNExampleCTIDriver;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SNExampleCTIDriver);\n\n\n//# sourceURL=webpack://sn-example-ctidriver/./src/SNExampleCTIDriverAccenture.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/SNExampleCTIDriverAccenture.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;