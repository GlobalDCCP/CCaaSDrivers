/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 449:
/***/ (function(__unused_webpack_module, exports) {


// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CUSTOMERDATAENUM = void 0;
exports.CUSTOMERDATAENUM = {
    PHONENUMBER: 'phonenumber',
    EMAIL: 'email',
    NAME: 'name'
};
const OPEN_CTI_VERSION = '61.0';
const RECORD_TYPE = {
    CONTACT: 'Contact',
    ACCOUNT: 'Account'
};
const CONVERSATION_TYPE = {
    "VOICE_CALL": 192440000,
    "VOICE": 192370000
};
class SFDCCPCTIDriver {
    /**
     * Constructor
     *
     * @param {any} ccaaSSDKInstance Instance of CCaaSSDK
     *
     * @returns Instance
     */
    constructor(ccaaSSDKInstance) {
        if (!ccaaSSDKInstance) {
            throw new Error('ccaaSSDKInstance cannot be null or undefined');
        }
        this.ccaaSSDKInstance = ccaaSSDKInstance;
    }
    /**
     * Function to initialize the scripts and do the operations once it is loaded
     *
     * @returns Promise void
     */
    initialize() {
        let isSforcePresent = typeof window.sforce !== 'undefined' && typeof window.sforce.opencti !== 'undefined';
        if (!isSforcePresent) {
            const openCTIurlPath = `/support/api/${OPEN_CTI_VERSION}/lightning/opencti.js`;
            const salesforceorgdomain = new URL(document.referrer).origin;
            const source = `${salesforceorgdomain}${openCTIurlPath}`;
            const sourceResult = SFDCCPCTIDriver.loadScript(source);
            return sourceResult;
        }
        return Promise.resolve(true);
    }
    /**
     * Prepares a conversation, if an account/contact is found then it shows sreen pop with customer information
     *
     * @param {ConversationInfo} conversationData - An object containing conversation details and customer data.
     * @returns {Promise<void>} A promise that resolves when the conversation is ready, or rejects with an error if any issues occur.
     */
    conversationReady(conversationData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("*** Conversation Ready");
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const conversationDetails = yield this.ccaaSSDKInstance.conversation.getConversationData(conversationData.conversationId, ['msdyn_isoutbound', 'msdyn_channel', 'subject']);
                // Get conversation call type (example: inbound, outbound, etc.)
                let conversationCallType = window.sforce.opencti.CALL_TYPE.INBOUND;
                console.log("Conversation type: " + conversationCallType);
                if (conversationDetails.msdyn_channel) {
                    if (conversationDetails.msdyn_channel === CONVERSATION_TYPE.VOICE || conversationDetails.msdyn_channel === CONVERSATION_TYPE.VOICE_CALL) {
                        if (conversationDetails.msdyn_isoutbound) {
                            conversationCallType = window.sforce.opencti.CALL_TYPE.OUTBOUND;
                        }
                    }
                }
                // find if contact or account salesforce record available for given customer info
                const { contactId, accountId } = yield SFDCCPCTIDriver.getContactOrAccountId(conversationData, conversationCallType);
                this.contactId = contactId;
                this.accountId = accountId;
                console.log("ContactID: " + this.contactId);
                console.log("AccountID: " + this.accountId);
                if (this.contactId || this.accountId) {
                    SFDCCPCTIDriver.screenPop(this.contactId || this.accountId);
                }
            }));
        });
    }
    /**
     * Function for ending a conversation.
     *
     * @param {string} conversationId - Unique identifier of the conversation.
     * @returns void
     */
    endConversation() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method is not defined.');
        });
    }
    /**
     * Function to handle operations on Click to dial
     * @param {ClickToDialCallbackFunction} callbackFuntion func to be registered for click-to-dial.
     * @returns void
     */
    clickToDial(callbackFuntion) {
        window.sforce.opencti.enableClickToDial();
        window.sforce.opencti.onClickToDial({
            listener: (payload) => {
                const clickDialPayload = {
                    number: payload.number,
                    objectType: payload.objectType,
                    recordId: payload.recordId,
                    recordName: payload.recordName
                };
                callbackFuntion(clickDialPayload);
                this.setSoftPhonePanelVisibility(true);
            }
        });
    }
    /**
     * Funtion to set visibility of softphone panel
     * @param {boolean} visible flag to indicate visibility
     * @returns void
     */
    setSoftPhonePanelVisibility(status = true) {
        const isPanelVisible = window.sforce.opencti.isSoftphonePanelVisible({
            callback: (response) => {
                if (response.success) {
                    return response.returnValue.visible;
                }
                else {
                    throw new Error(response.errors);
                }
            }
        });
        if (status !== isPanelVisible) {
            window.sforce.opencti.setSoftphonePanelVisibility({
                visible: status
            });
        }
    }
    /**
     * Funtion to set width of softphone panel
     * @param {number} width number to set width
     * @returns void
     */
    setSoftPhonePanelWidth(width) {
        window.sforce.opencti.setSoftphonePanelWidth({
            widthPX: width
        });
    }
    /**
     * Funtion to set height of softphone panel
     * @param {number} height number to set height
     * @returns void
     */
    setSoftPhonePanelHeight(height) {
        window.sforce.opencti.setSoftphonePanelHeight({
            heightPX: height
        });
    }
    /**
     * Initiates a screen pop action in OpenCTI.
     *
     * @param {string} recordId - The ID of the record to be displayed in the screen pop.
     * @returns {Promise<string>} A promise that resolves with a success message upon successful screen pop, or rejects with an error message if screen pop fails.
     */
    static screenPop(recordId) {
        return new Promise((resolve, reject) => {
            window.sforce.opencti.screenPop({
                type: window.sforce.opencti.SCREENPOP_TYPE.SOBJECT,
                params: {
                    recordId: recordId
                },
                callback: (response) => {
                    if (response.success) {
                        resolve(response.success);
                    }
                    else {
                        reject(response.errors);
                    }
                }
            });
        });
    }
    /**
     * Searches for records based on the specified search parameters and call type.
     *
     * @param {string} searchParam - The value used to search for records.
     * @param {string} callType - The type of call being made.
     * @returns {Promise<SFRecordInfo[]>} A promise that resolves with an array of records found from the search.
     */
    static searchForRecords(searchParam, callType) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Searching for ${searchParam}, callType is ${callType}`);
            return new Promise((resolve, reject) => {
                // window.sforce.opencti.searchAndScreenPop({
                //     searchParams: searchParam,
                //     callType: callType,
                //     deferred: true,
                //     callback: (response) => {
                //         const recordsArray: SFRecordInfo[] = [];
                //         if (response.success && response.returnValue) {
                //             for (const [key, record] of Object.entries(response.returnValue)) {
                //                 if (record && ((record as SFRecord).RecordType === RECORD_TYPE.CONTACT || (record as SFRecord).RecordType === RECORD_TYPE.ACCOUNT)) {
                //                     recordsArray.push({
                //                         id: key,
                //                         type: (record as SFRecord).RecordType
                //                     });
                //                 }
                //             }
                //             resolve(recordsArray);
                //         } else {
                //             console.log("Search failed!");
                //             console.log(response.errors);
                //             console.log(response);
                //             reject(response.errors);
                //         }
                //     }
                // });
                window.sforce.opencti.searchAndScreenPop({
                    searchParams: searchParam,
                    callType: 'inbound',
                    defaultFieldValues: { LastName: 'searchAndScreenPopLastName' },
                    deferred: true,
                    callback: (response) => {
                        const recordsArray = [];
                        if (response.success && response.returnValue) {
                            for (const [key, record] of Object.entries(response.returnValue)) {
                                if (record && (record.RecordType === RECORD_TYPE.CONTACT || record.RecordType === RECORD_TYPE.ACCOUNT)) {
                                    recordsArray.push({
                                        id: key,
                                        type: record.RecordType
                                    });
                                }
                            }
                            resolve(recordsArray);
                        }
                        else {
                            console.log(response.errors);
                            reject(response.errors);
                        }
                    }
                });
            });
        });
    }
    /**
     * Method to fetch ContactId and accountId using current convesation information
     * @param conversationData conversationData Object containing conversation details and customer data.
     * @param conversationCallType Call Type
     * @returns {Promise<contactId: string | null, accountId: string | null>}
     */
    static getContactOrAccountId(conversationData, coversationCallType) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactIds = new Set();
            const accountIds = new Set();
            const records = yield SFDCCPCTIDriver.getRecords(conversationData, coversationCallType);
            if (records) {
                records.forEach(({ id, type }) => {
                    if (type === RECORD_TYPE.CONTACT) {
                        contactIds.add(id);
                    }
                    else if (type === RECORD_TYPE.ACCOUNT) {
                        accountIds.add(id);
                    }
                });
            }
            const contactId = (contactIds.size === 1) ? contactIds.values().next().value : undefined;
            const accountId = (accountIds.size === 1) ? accountIds.values().next().value : undefined;
            return { contactId, accountId };
        });
    }
    /**
     * Get Records data using conversation details
     * @param conversationData conversationData Object containing conversation details and customer data.
     * @param conversationCallType Call Type
     * @returns {Promise<SFRecordInfo[]>}
     */
    static getRecords(conversationData, coversationCallType) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerData = conversationData.customerData;
            let records = [];
            console.log(conversationData);
            try {
                if (SFDCCPCTIDriver.checkIfNotEmtpy(exports.CUSTOMERDATAENUM.PHONENUMBER, customerData)) {
                    console.log("Searching by phonenumner");
                    records = yield SFDCCPCTIDriver.searchForRecords(customerData.phonenumber, coversationCallType);
                }
                else if (SFDCCPCTIDriver.checkIfNotEmtpy(exports.CUSTOMERDATAENUM.EMAIL, customerData)) {
                    console.log("Searching by email");
                    records = yield SFDCCPCTIDriver.searchForRecords(customerData.email, coversationCallType);
                }
                else if (SFDCCPCTIDriver.checkIfNotEmtpy(exports.CUSTOMERDATAENUM.NAME, customerData)) {
                    console.log("Searching ny name");
                    records = yield SFDCCPCTIDriver.searchForRecords(customerData.name, coversationCallType);
                }
                return records;
            }
            catch (errors) {
                console.log(errors);
                throw new Error(errors);
            }
        });
    }
    /**
     * Check if not empty or null or undefined
     * @param fieldName string of field name
     * @param customerData object to be search in
     * @returns boolean
     */
    static checkIfNotEmtpy(fieldName, customerData) {
        return customerData[fieldName] !== undefined && customerData[fieldName] !== null && customerData[fieldName] !== "";
    }
    /**
     * Function to get script to load
     *
     * @param {string} source url
     */
    static loadScript(source) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = source;
            script.onload = function () {
                resolve(true);
            };
            script.onerror = function () {
                reject(new Error(`Error in loading ${source}`));
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }
}
/**
 * Checks and initializes the CCaaS namespace and CTIDriver object if they don't exist.
 * If CCaaS namespace does not exist, it creates it as an empty object.
 * If CTIDriver object does not exist within CCaaS namespace, it assigns it the value of SFExampleCTIDriver.
 */
window.CCaaS = window.CCaaS || {};
if (!window.CCaaS.CTIDriver) {
    window.CCaaS.CTIDriver = SFDCCPCTIDriver;
}
exports["default"] = SFDCCPCTIDriver;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[449](0, __webpack_exports__);
/******/ 	
/******/ })()
;