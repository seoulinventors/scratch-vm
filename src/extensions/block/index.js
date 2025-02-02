// import ArgumentType from '../../extension-support/argument-type';
// import BlockType from '../../extension-support/block-type';
// import Cast from '../../util/cast';
// import log from '../../util/log';

// import blockIcon from './block-icon.png';
// import translations from './translations.json';

// import BLE from './ble';
// import WebSerial from './serial-web';
const ArgumentType = require( '../../extension-support/argument-type');
const BlockType = require( '../../extension-support/block-type');
const Cast = require( '../../util/cast');
const log = require( '../../util/log');

//const blockIcon = 'data:image/png;base64,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';
const blockIcon = 'data:image/png;base64,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';

const translations = require('./translations.json');

const BLE = require('../../io/ble');
const WebSerial = require('./serial-web');

const uint8ArrayToBase64 = array => window.btoa(String.fromCharCode(...array));
const base64ToUint8Array = base64 => {
    const raw = window.atob(base64);
    return Uint8Array.from(Array.prototype.map.call(raw, x => x.charCodeAt(0)));
};

// let formatMessage = messageData => messageData.defaultMessage;
const formatMessage = require('format-message');

/**
 * Setup format-message for this extension.
 */
const setupTranslations = () => {
    const localeSetup = formatMessage.setup();
    if (localeSetup && localeSetup.translations[localeSetup.locale]) {
        Object.assign(
            localeSetup.translations[localeSetup.locale],
            translations[localeSetup.locale]
        );
    }
};

const EXTENSION_ID = 'microbitMore';

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL = 'https://microbit-more.github.io/dist/microbitMore.mjs';

/**
 * Enum for version of the hardware.
 * @readonly
 * @enum {number}
 */
const MbitMoreHardwareVersion =
{
    MICROBIT_V1: 1,
    MICROBIT_V2: 2
};

/**
 * Communication route between Scratch and micro:bit
 *
 */
const CommunicationRoute = {
    BLE: 0,
    SERIAL: 1
};

/**
 * Enum for micro:bit BLE command protocol.
 * https://github.com/LLK/scratch-microbit-firmware/blob/master/protocol.md
 * @readonly
 * @enum {number}
 */
const BLECommand = {
    CMD_CONFIG: 0x00,
    CMD_PIN: 0x01,
    CMD_DISPLAY: 0x02,
    CMD_AUDIO: 0x03,
    CMD_DATA: 0x04
};

/**
 * Enum for command about gpio pins.
 * @readonly
 * @enum {number}
 */
const MbitMorePinCommand =
{
    SET_OUTPUT: 0x01,
    SET_PWM: 0x02,
    SET_SERVO: 0x03,
    SET_PULL: 0x04,
    SET_EVENT: 0x05
};

/**
 * Enum for command about gpio pins.
 * @readonly
 * @enum {number}
 */
const MbitMoreDisplayCommand =
{
    CLEAR: 0x00,
    TEXT: 0x01,
    PIXELS_0: 0x02,
    PIXELS_1: 0x03
};

/**
 * Enum for name of pull mode.
 * @readonly
 * @enum {number}
 */
const MbitMorePullModeName = {
    NONE: 'NONE',
    DOWN: 'DOWN',
    UP: 'UP'
};

/**
 * Enum for ID of pull mode.
 * @readonly
 * @enum {number}
 */
const MbitMorePullModeID = {
    NONE: 0,
    DOWN: 1,
    UP: 2
};

/**
 * Enum for data format.
 * @readonly
 * @enum {number}
 */
const MbitMoreDataFormat = {
    CONFIG: 0x10, // not used at this version
    PIN_EVENT: 0x11,
    ACTION_EVENT: 0x12,
    DATA_NUMBER: 0x13,
    DATA_TEXT: 0x14
};

/**
 * Enum for action event type.
 * @readonly
 * @enum {number}
 */
const MbitMoreActionEvent = {
    BUTTON: 0x01,
    GESTURE: 0x02
};

/**
 * Enum for ID of pin-mode
 * @readonly
 * @enum {string}
 */
const MbitMorePinMode = {
    INPUT: 'INPUT',
    OUTPUT: 'OUTPUT',
    PWM: 'PWM',
    SERVO: 'SERVO',
    TOUCH: 'TOUCH'
};

/**
 * Enum for ID of buttons
 * @readonly
 * @enum {string}
 */
const MbitMoreButtonName = {
    P0: 'P0',
    P1: 'P1',
    P2: 'P2',
    A: 'A',
    B: 'B',
    LOGO: 'LOGO'
};

/**
 * Enum for componentID of buttons
 * @readonly
 * @enum {string}
 */
const MbitMoreButtonID = {
    1: 'A',
    2: 'B',
    100: 'P0',
    101: 'P1',
    102: 'P2',
    121: 'LOGO'
};

/**
 * Enum for index of pin for buttons
 * @readonly
 * @enum {number}
 */
const MbitMoreButtonPinIndex = {
    P0: 0,
    P1: 1,
    P2: 2
};

/**
 * Enum for index in data of button state
 * @readonly
 * @enum {number}
 */
const MbitMoreButtonStateIndex = {
    P0: 0,
    P1: 1,
    P2: 2,
    A: 3,
    B: 4,
    LOGO: 5
};

/**
 * Enum for name of event from button
 * @readonly
 * @enum {string}
 */
const MbitMoreButtonEventName = {
    DOWN: 'DOWN',
    UP: 'UP',
    CLICK: 'CLICK',
    LONG_CLICK: 'LONG_CLICK',
    HOLD: 'HOLD',
    DOUBLE_CLICK: 'DOUBLE_CLICK'
};

/**
 * Enum for ID of event from button
 * @readonly
 * @enum {string}
 */
const MbitMoreButtonEventID = {
    1: 'DOWN',
    2: 'UP',
    3: 'CLICK',
    4: 'LONG_CLICK',
    5: 'HOLD',
    6: 'DOUBLE_CLICK'
};

/**
 * Enum for name of gesture.
 * @readonly
 * @enum {string}
 */
const MbitMoreGestureName =
{
    TILT_UP: 'TILT_UP',
    TILT_DOWN: 'TILT_DOWN',
    TILT_LEFT: 'TILT_LEFT',
    TILT_RIGHT: 'TILT_RIGHT',
    FACE_UP: 'FACE_UP',
    FACE_DOWN: 'FACE_DOWN',
    FREEFALL: 'FREEFALL',
    G3: 'G3',
    G6: 'G6',
    G8: 'G8',
    SHAKE: 'SHAKE'
};

/**
 * Enum for ID of gesture.
 * @readonly
 * @enum {string}
 */
const MbitMoreGestureID =
{
    1: 'TILT_UP',
    2: 'TILT_DOWN',
    3: 'TILT_LEFT',
    4: 'TILT_RIGHT',
    5: 'FACE_UP',
    6: 'FACE_DOWN',
    7: 'FREEFALL',
    8: 'G3',
    9: 'G6',
    10: 'G8',
    11: 'SHAKE'
};

/**
 * Enum for event type in the micro:bit runtime.
 * @readonly
 * @enum {number}
 */
const MbitMorePinEventType = {
    NONE: 0,
    ON_EDGE: 1,
    ON_PULSE: 2,
    ON_TOUCH: 3
};

/**
 * Enum for event value in the micro:bit runtime.
 * @readonly
 * @enum {number}
 */
const MbitMorePinEvent = {
    RISE: 2,
    FALL: 3,
    PULSE_HIGH: 4,
    PULSE_LOW: 5
};

/**
 * Enum for data type of data-sending.
 * @readonly
 * @enum {number}
 */
const MbitMoreSendingDataType = {
    NUMBER: 1,
    TEXT: 2
};

/**
 * Enum for sub-command about configurations.
 * @readonly
 * @enum {number}
 */
const MbitMoreConfig =
{
    MIC: 0x01,
    TOUCH: 0x02
};

/**
 * Enum for sub-command about audio.
 * @readonly
 * @enum {number}
 */
const MbitMoreAudioCommand =
{
    STOP_TONE: 0x00,
    PLAY_TONE: 0x01
};

/**
 * A time interval to wait (in milliseconds) before reporting to the BLE socket
 * that data has stopped coming from the peripheral.
 */
const BLETimeout = 4500;


/**
 * A string to report to the BLE socket when the micro:bit has stopped receiving data.
 * @type {string}
 */
const BLEDataStoppedError = 'micro:bit extension stopped receiving data';

const MM_SERVICE = {
    ID: '0b50f3e4-607f-4151-9091-7d008d6ffc5c',
    COMMAND_CH: '0b500100-607f-4151-9091-7d008d6ffc5c',
    STATE_CH: '0b500101-607f-4151-9091-7d008d6ffc5c',
    MOTION_CH: '0b500102-607f-4151-9091-7d008d6ffc5c',
    PIN_EVENT_CH: '0b500110-607f-4151-9091-7d008d6ffc5c',
    ACTION_EVENT_CH: '0b500111-607f-4151-9091-7d008d6ffc5c',
    ANALOG_IN_CH: [
        '0b500120-607f-4151-9091-7d008d6ffc5c',
        '0b500121-607f-4151-9091-7d008d6ffc5c',
        '0b500122-607f-4151-9091-7d008d6ffc5c'
    ],
    MESSAGE_CH: '0b500130-607f-4151-9091-7d008d6ffc5c'
};

/**
 * Enum for axis menu options.
 * @readonly
 * @enum {string}
 */
const AxisSymbol = {
    X: 'x',
    Y: 'y',
    Z: 'z',
    Absolute: 'absolute'
};

/**
 * The unit-value of the gravitational acceleration from Micro:bit.
 * @type {number}
 */
const G = 1024;

/**
 * Manage communication with a MicroBit peripheral over a Scrath Link client socket.
 */
class MbitMore {

    /**
     * Construct a MicroBit communication object.
     * @param {Runtime} runtime - the Scratch 3.0 runtime
     * @param {string} extensionId - the id of the extension
     */
    constructor (runtime, extensionId) {

        /**
         * The Scratch 3.0 runtime used to trigger the green flag button.
         * @type {Runtime}
         * @private
         */
        this.runtime = runtime;

        /**
         * The BluetoothLowEnergy connection socket for reading/writing peripheral data.
         * @type {BLE}
         * @private
         */
        this._ble = null;
        this.runtime.registerPeripheralExtension(extensionId, this);

        /**
         * The id of the extension this peripheral belongs to.
         */
        this._extensionId = extensionId;

        this.digitalLevel = {};
        this.lightLevel = 0;
        this.temperature = 0;
        this.soundLevel = 0;
        this.pitch = 0;
        this.roll = 0;
        this.acceleration = {
            x: 0,
            y: 0,
            z: 0
        };
        this.compassHeading = 0;
        this.magneticForce = {
            x: 0,
            y: 0,
            z: 0
        };

        this.buttonState = {};

        /**
         * The most recently received button events for each buttons.
         * @type {Object} - Store of buttons which has events.
         * @private
         */
        this.buttonEvents = {};
        Object.keys(MbitMoreButtonStateIndex).forEach(name => {
            this.buttonEvents[name] = {};
        });

        /**
         * The most recently received gesture events.
         * @type {Object <number, number>} - Store of gesture ID and timestamp.
         * @private
         */
        this.gestureEvents = {};


        /**
         * The most recently received events for each pin.
         * @type {Object} - Store of pins which has events.
         * @private
         */
        this._pinEvents = {};

        /**
         * The most recently received data from micro:bit.
         * @type {Object} - Store of received data
         * @private
         */
        this.receivedData = {};

        this.analogIn = [0, 1, 2];
        this.analogValue = [];
        this.analogIn.forEach(pinIndex => {
            this.analogValue[pinIndex] = 0;
        });

        this.gpio = [
            0, 1, 2,
            8,
            12, 13, 14, 15, 16
        ];
        this.gpio.forEach(pinIndex => {
            this.digitalLevel[pinIndex] = 0;
        });

        /**
         * Interval ID for data reading timeout.
         * @type {number}
         * @private
         */
        this._timeoutID = null;

        /**
         * A flag that is true while we are busy sending data to the BLE socket.
         * @type {boolean}
         * @private
         */
        this.bleBusy = true;

        /**
         * ID for a timeout which is used to clear the busy flag if it has been
         * true for a long time.
         */
        this.bleBusyTimeoutID = null;

        this.onDisconnect = this.onDisconnect.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this.onNotify = this.onNotify.bind(this);

        this.stopTone = this.stopTone.bind(this);
        if (this.runtime) {
            this.runtime.on('PROJECT_STOP_ALL', this.stopTone);
        }

        this.analogInUpdateInterval = 100; // milli-seconds
        this.analogInLastUpdated = [Date.now(), Date.now(), Date.now()];

        /**
         * A time interval to wait (in milliseconds) while a block that sends a BLE message is running.
         * @type {number}
         */
        this.sendCommandInterval = 30;

        this.initConfig();

        // keyboard state monitor
        this.keyState = {};
        document.body.addEventListener('keydown', e => {
            this.keyState[e.code] = {
                key: e.key,
                code: e.code,
                alt: e.altKey,
                ctrl: e.ctrlKey,
                meta: e.metaKey,
                shift: e.shiftKey
            };
        });
        document.body.addEventListener('keyup', e => {
            delete this.keyState[e.code];
        });
    }

    /**
     * Initialize configuration of the micro:bit.
     */
    initConfig () {
        this.config = {};
        this.config.mic = false;
        this.config.pinMode = {};
    }

    /**
     * Start updating process for micro:bit state and motion.
     */
    startUpdater () {
        if (this.updater) {
            clearTimeout(this.updater);
        }
        if (this.bleAccessWaiting) {
            this.updater = setTimeout(() => this.startUpdater(), 0);
            return;
        }
        this.updateState()
            .then(() => this.updateMotion())
            .finally(() => {
                this.updater = setTimeout(
                    () => this.startUpdater(),
                    this.microbitUpdateInterval
                );
            });
    }

    /**
     * Stop updating process for micro:bit state and motion.
     */
    stopUpdater () {
        clearTimeout(this.updater);
    }

    /**
     * @param {string} text - the text to display.
     * @param {number} delay - The time to delay between characters, in milliseconds.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    displayText (text, delay, util) {
        const textLength = Math.min(18, text.length);
        const textData = new Uint8Array(textLength + 1);
        for (let i = 0; i < textLength; i++) {
            textData[i] = text.charCodeAt(i);
        }
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_DISPLAY << 5) | MbitMoreDisplayCommand.TEXT,
                message: new Uint8Array([
                    Math.min(255, (Math.max(0, delay) / 10)),
                    ...textData
                ])
            }],
            util
        );
    }

    /**
     * Send display pixcels command to micro:bit.
     * @param {Array.<Array.<number>>} matrix - pattern to display.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    displayPixels (matrix, util) {
        const cmdSet = [
            {
                id: (BLECommand.CMD_DISPLAY << 5) | MbitMoreDisplayCommand.PIXELS_0,
                message: new Uint8Array([
                    ...matrix[0],
                    ...matrix[1],
                    ...matrix[2]
                ])
            },
            {
                id: (BLECommand.CMD_DISPLAY << 5) | MbitMoreDisplayCommand.PIXELS_1,
                message: new Uint8Array([
                    ...matrix[3],
                    ...matrix[4]
                ])
            }
        ];
        return this.sendCommandSet(cmdSet, util);
    }

    /**
     * Set pull mode to the pin.
     * @param {number} pinIndex - index of the pin
     * @param {MbitMorePullModeID} pullMode - pull mode to set
     * @param {BlockUtility} util - utility object provided from the runtime
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    setPullMode (pinIndex, pullMode, util) {
        this.config.pinMode[pinIndex] = MbitMorePinMode.INPUT;
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_PIN << 5) | MbitMorePinCommand.SET_PULL,
                message: new Uint8Array([
                    pinIndex,
                    pullMode
                ])
            }],
            util
        );
    }

    /**
     * Set pin to digital output mode on the level.
     * @param {number} pinIndex - Index of pin.
     * @param {boolean} level - Value in digital (true = High)
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    setPinOutput (pinIndex, level, util) {
        this.config.pinMode[pinIndex] = MbitMorePinMode.OUTPUT;
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_PIN << 5) | MbitMorePinCommand.SET_OUTPUT,
                message: new Uint8Array(
                    [
                        pinIndex,
                        (level ? 1 : 0)
                    ]
                )
            }],
            util
        );
    }

    /**
     * Set the pin to PWM mode on the level.
     * @param {number} pinIndex - index of the pin
     * @param {number} level - value of analog output [0..1024].
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    setPinPWM (pinIndex, level, util) {
        this.config.pinMode[pinIndex] = MbitMorePinMode.PWM;
        const dataView = new DataView(new ArrayBuffer(2));
        dataView.setUint16(0, level, true);
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_PIN << 5) | MbitMorePinCommand.SET_PWM,
                message: new Uint8Array(
                    [
                        pinIndex,
                        dataView.getUint8(0),
                        dataView.getUint8(1)
                    ]
                )
            }],
            util
        );
    }


    /**
     * Set the pin to Servo mode on the angle in the range and center.
     * @param {number} pinIndex - index of the pin.
     * @param {number} angle - the level to set on the output pin, in the range 0 - 180.
     * @param {number} range - the span of possible values. '0' means default(2000).
     * @param {number} center - the center point from which to calculate the lower and upper bounds.
     *                          '0' means default(1500).
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    setPinServo (pinIndex, angle, range, center, util) {
        this.config.pinMode[pinIndex] = MbitMorePinMode.SERVO;
        if (!range || range < 0) range = 0;
        if (!center || center < 0) center = 0;
        const dataView = new DataView(new ArrayBuffer(6));
        dataView.setUint16(0, angle, true);
        dataView.setUint16(2, range, true);
        dataView.setUint16(4, center, true);
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_PIN << 5) | MbitMorePinCommand.SET_SERVO,
                message: new Uint8Array(
                    [
                        pinIndex,
                        dataView.getUint8(0),
                        dataView.getUint8(1),
                        dataView.getUint8(2),
                        dataView.getUint8(3),
                        dataView.getUint8(4),
                        dataView.getUint8(5)
                    ]
                )
            }],
            util);
    }

    /**
     * Read light level from the light sensor.
     * @param {object} util - utility object provided by the runtime.
     * @return {number} - value of the light level [0..255].
     */
    readLightLevel () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.lightLevel;
    }

    /**
     * Update data of the analog input.
     * @param {number} pinIndex - index of the pin to get value.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves value of analog input or undefined if this process was yield.
     */
    readAnalogIn (pinIndex, util) {
        if (!this.isConnected()) {
            return Promise.resolve(0);
        }
        if ((Date.now() - this.analogInLastUpdated[pinIndex]) < this.analogInUpdateInterval) {
            return Promise.resolve(this.analogValue[pinIndex]);
        }
        if (this.bleBusy) {
            this.bleAccessWaiting = true;
            if (util) util.yield(); // re-try this call after a while.
            return; // Do not return Promise.resolve() to re-try.
        }
        this.bleBusy = true;
        this.bleBusyTimeoutID = window.setTimeout(() => {
            this.bleBusy = false;
            this.bleAccessWaiting = false;
        }, 1000);
        return new Promise(resolve => this._ble.read(
            MM_SERVICE.ID,
            MM_SERVICE.ANALOG_IN_CH[pinIndex],
            false)
            .then(result => {
                window.clearTimeout(this.bleBusyTimeoutID);
                this.bleBusy = false;
                this.bleAccessWaiting = false;
                if (!result) {
                    return resolve(this.analogValue[pinIndex]);
                }
                const data = base64ToUint8Array(result.message);
                const dataView = new DataView(data.buffer, 0);
                this.analogValue[pinIndex] = dataView.getUint16(0, true);
                this.analogInLastUpdated = Date.now();
                resolve(this.analogValue[pinIndex]);
            })
        );
    }

    /**
     * Update data of digital level, light level, temperature, sound level.
     * @return {Promise} - a Promise that resolves updated data holder.
     */
    updateState () {
        if (!this.isConnected()) return Promise.resolve(this);
        if (this.bleBusy) {
            return Promise.resolve(this);
        }
        this.bleBusy = true;
        this.bleBusyTimeoutID = window.setTimeout(() => {
            this.bleBusy = false;
        }, 1000);
        return new Promise(resolve => {
            this._ble.read(
                MM_SERVICE.ID,
                MM_SERVICE.STATE_CH,
                false)
                .then(result => {
                    window.clearTimeout(this.bleBusyTimeoutID);
                    this.bleBusy = false;
                    if (!result) return resolve(this);
                    const data = base64ToUint8Array(result.message);
                    const dataView = new DataView(data.buffer, 0);
                    // Digital Input
                    const gpioData = dataView.getUint32(0, true);
                    for (let i = 0; i < this.gpio.length; i++) {
                        this.digitalLevel[this.gpio[i]] = (gpioData >> this.gpio[i]) & 1;
                    }
                    Object.keys(MbitMoreButtonStateIndex).forEach(
                        name => {
                            this.buttonState[name] = (gpioData >> (24 + MbitMoreButtonStateIndex[name])) & 1;
                        });
                    this.lightLevel = dataView.getUint8(4);
                    this.temperature = dataView.getUint8(5) - 128;
                    this.soundLevel = dataView.getUint8(6);
                    this.resetConnectionTimeout();
                    resolve(this);
                });
        });
    }

    /**
     * Read temperature (integer in celsius) from the micro:bit cpu.
     * @return {number} - degrees of temperature [centigrade].
     */
    readTemperature () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.temperature;
    }

    /**
     * Configure microphone.
     * @param {boolean} use - true to use microphone.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves state of the microphone or undefined if the process was yield.
     */
    configMic (use, util) {
        use = (use === true);
        if (!this.isConnected()) {
            return Promise.resolve(false);
        }
        if (this.config.mic === use) {
            return Promise.resolve(this.config.mic);
        }
        const sendPromise = this.sendCommandSet(
            [{
                id: (BLECommand.CMD_CONFIG << 5) | MbitMoreConfig.MIC,
                message: new Uint8Array([(use ? 1 : 0)]) // use microphone
            }],
            util
        );
        if (sendPromise) {
            return sendPromise
                .then(() => {
                    this.config.mic = use;
                    return this.config.mic;
                });
        }
        return;
    }

    /**
     * Play tone on the speaker.
     * @param {number} frequency - wave frequency to play [Hz]
     * @param {number} volume laudness of tone [%]
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves to send command or undefined if this process was yield.
     */
    playTone (frequency, volume, util) {
        if (!this.isConnected()) {
            return Promise.resolve();
        }
        const frequencyData = new DataView(new ArrayBuffer(4));
        frequencyData.setUint32(0, Math.round(1000000 / frequency), true);
        volume = Math.round(volume * 0xff / 100);
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_AUDIO << 5) | MbitMoreAudioCommand.PLAY_TONE,
                message: new Uint8Array([
                    frequencyData.getUint8(0),
                    frequencyData.getUint8(1),
                    frequencyData.getUint8(2),
                    frequencyData.getUint8(3),
                    volume
                ])
            }],
            util
        );
    }

    /**
     * Stop playing tone on the speaker.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves to send command or undefined if this process was yield.
     */
    stopTone (util) {
        if (!this.isConnected()) {
            return Promise.resolve();
        }
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_AUDIO << 5) | MbitMoreAudioCommand.STOP_TONE,
                message: new Uint8Array([])
            }],
            util
        );
    }

    /**
     * Read sound level.
     * @return {number} - level of loudness (0 .. 255).
     */
    readSoundLevel () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.soundLevel;
    }

    /**
     * Update data of acceleration, magnetic force.
     * @return {Promise} - a Promise that resolves updated data holder.
     */
    updateMotion () {
        if (!this.isConnected()) return Promise.resolve(this);
        if (this.bleBusy) {
            return Promise.resolve(this);
        }
        this.bleBusy = true;
        this.bleBusyTimeoutID = window.setTimeout(() => {
            this.bleBusy = false;
        }, 1000);
        return new Promise(resolve => {
            this._ble.read(
                MM_SERVICE.ID,
                MM_SERVICE.MOTION_CH,
                false)
                .then(result => {
                    window.clearTimeout(this.bleBusyTimeoutID);
                    this.bleBusy = false;
                    if (!result) return resolve(this);
                    const data = base64ToUint8Array(result.message);
                    const dataView = new DataView(data.buffer, 0);
                    // Accelerometer
                    this.pitch = Math.round(dataView.getInt16(0, true) * 180 / Math.PI / 1000);
                    this.roll = Math.round(dataView.getInt16(2, true) * 180 / Math.PI / 1000);
                    this.acceleration.x = 1000 * dataView.getInt16(4, true) / G;
                    this.acceleration.y = 1000 * dataView.getInt16(6, true) / G;
                    this.acceleration.z = 1000 * dataView.getInt16(8, true) / G;
                    // Magnetometer
                    this.compassHeading = dataView.getUint16(10, true);
                    this.magneticForce.x = dataView.getInt16(12, true);
                    this.magneticForce.y = dataView.getInt16(14, true);
                    this.magneticForce.z = dataView.getInt16(16, true);
                    this.resetConnectionTimeout();
                    resolve(this);
                });
        });
    }

    /**
     * Read pitch [degrees] of the micro:bit heading direction.
     * @return {number} - degree of pitch.
     */
    readPitch () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.pitch;
    }

    /**
     * Read roll [degrees] of the micro:bit heading direction.
     * @return {number} - degree of roll.
     */
    readRoll () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.roll;
    }

    /**
     * Read the value of gravitational acceleration [milli-g] for the axis.
     * @param {AxisSymbol} axis - direction of acceleration.
     * @return {number} - value of acceleration.
     */
    readAcceleration (axis) {
        if (!this.isConnected()) {
            return 0;
        }
        if (axis === AxisSymbol.Absolute) {
            return Math.round(
                Math.sqrt(
                    (this.acceleration.x ** 2) +
                            (this.acceleration.y ** 2) +
                            (this.acceleration.z ** 2)
                )
            );
        }
        return this.acceleration[axis];
    }

    /**
     * Read the angle (degrees) of heading direction from the north.
     * @return {number} - degree of compass heading.
     */
    readCompassHeading () {
        if (!this.isConnected()) {
            return 0;
        }
        return this.compassHeading;
    }


    /**
     * Read value of magnetic force [micro teslas] for the axis.
     * @param {AxisSymbol} axis - direction of magnetic force.
     * @return {number} - value of magnetic force.
     */
    readMagneticForce (axis) {
        if (!this.isConnected()) {
            return 0;
        }
        if (axis === AxisSymbol.Absolute) {
            return Math.round(
                Math.sqrt(
                    (this.magneticForce.x ** 2) +
                            (this.magneticForce.y ** 2) +
                            (this.magneticForce.z ** 2)
                )
            );
        }
        return this.magneticForce[axis];
    }

    /**
     * Start to scan Bluetooth LE devices to find micro:bit with MicroBit More service.
     */
    scanBLE () {
        const connectorClass = BLE;
        this._ble = new connectorClass(
            this.runtime,
            this._extensionId,
            {
                filters: [
                    {namePrefix: 'BBC micro:bit'},
                    {services: [MM_SERVICE.ID]}
                ]
            },
            this._onConnect,
            this.onDisconnect
        );
    }

    /**
     * Start to scan USB serial devices to find micro:bit v2.
     */
    scanSerial () {
        this._ble = new WebSerial(
            this.runtime,
            this._extensionId,
            {
                filters: [
                    {usbVendorId: 0x0d28, usbProductId: 0x0204}
                ]
            },
            this._onConnect,
            this.onDisconnect
        );
    }

    /**
     * Whether the key is pressed at this moment.
     * @param {string} key - key in keyboard event
     * @returns {boolean} - return true when the key is pressed
     */
    isKeyPressing (key) {
        return Object.values(this.keyState).find(state => state.key === key);
    }

    /**
     * Called by the runtime when user wants to scan for a peripheral.
     */
    scan () {
        if (this._ble) {
            this._ble.disconnect();
        }
        this.bleBusy = true;
        if (('bluetooth' in navigator) && this.isKeyPressing('Shift')) {
            this.scanBLE();
        } else {
            this.scanSerial();
        }
        // The key state is cleared because the keyup event will be dropped by the browser dialog.
        this.keyState = {};
    }

    /**
     * Called by the runtime when user wants to connect to a certain peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect (id) {
        if (this._ble) {
            this._ble.connectPeripheral(id);
        }
    }

    /**
     * Disconnect from the micro:bit.
     */
    disconnect () {
        if (this._ble) {
            this._ble.disconnect();
        }
        this.onDisconnect();
    }

    /**
     * Reset all the state and timeout/interval ids.
     */
    onDisconnect () {
        this.stopUpdater();
        if (this._timeoutID) {
            window.clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }

    /**
     * Return true if connected to the micro:bit.
     * @return {boolean} - whether the micro:bit is connected.
     */
    isConnected () {
        let connected = false;
        if (this._ble) {
            connected = this._ble.isConnected();
        }
        return connected;
    }

    /**
     * Send a command to micro:bit.
     * @param {object} command command to send.
     * @param {number} command.id ID of the command.
     * @param {Uint8Array} command.message Contents of the command.
     * @return {Promise} a Promise that resolves when the data was sent and after send command interval.
     */
    sendCommand (command) {
        const data = uint8ArrayToBase64(
            new Uint8Array([
                command.id,
                ...command.message
            ])
        );
        return new Promise(resolve => {
            this._ble.write(
                MM_SERVICE.ID,
                MM_SERVICE.COMMAND_CH,
                data,
                'base64',
                false
            );
            setTimeout(() => resolve(), this.sendCommandInterval);
        });
    }

    /**
     * Send multiple commands sequentially.
     * @param {Array.<{id: number, message: Uint8Array}>} commands array of command.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when the all commands was sent.
     */
    sendCommandSet (commands, util) {
        if (!this.isConnected()) return Promise.resolve();
        if (this.bleBusy) {
            this.bleAccessWaiting = true;
            if (util) {
                util.yield(); // re-try this call after a while.
            } else {
                setTimeout(() => this.sendCommandSet(commands, util), 1);
            }
            return; // Do not return Promise.resolve() to re-try.
        }
        this.bleBusy = true;
        // Clear busy and BLE access waiting flag when the scratch-link does not respond.
        this.bleBusyTimeoutID = window.setTimeout(() => {
            this.bleBusy = false;
            this.bleAccessWaiting = false;
        }, 1000);
        return new Promise(resolve => {
            commands.reduce((acc, cur) => acc.then(() => this.sendCommand(cur)),
                Promise.resolve()
            )
                .then(() => {
                    window.clearTimeout(this.bleBusyTimeoutID);
                })
                .catch(err => {
                    log.log(err);
                    this._ble.handleDisconnectError(err);
                })
                .finally(() => {
                    this.bleBusy = false;
                    this.bleAccessWaiting = false;
                    resolve();
                });
        });
    }

    /**
     * Starts reading data from peripheral after BLE has connected to it.
     */
    _onConnect () {
        this._ble.read(
            MM_SERVICE.ID,
            MM_SERVICE.COMMAND_CH,
            false)
            .then(result => {
                if (!result) {
                    throw new Error('Config is not readable');
                }
                const data = base64ToUint8Array(result.message);
                const dataView = new DataView(data.buffer, 0);
                this.hardware = dataView.getUint8(0);
                this.protocol = dataView.getUint8(1);
                this.route = dataView.getUint8(2);
                this._ble.startNotifications(
                    MM_SERVICE.ID,
                    MM_SERVICE.ACTION_EVENT_CH,
                    this.onNotify);
                this._ble.startNotifications(
                    MM_SERVICE.ID,
                    MM_SERVICE.PIN_EVENT_CH,
                    this.onNotify);
                if (this.hardware === MbitMoreHardwareVersion.MICROBIT_V1) {
                    this.microbitUpdateInterval = 100; // milliseconds
                } else {
                    this._ble.startNotifications(
                        MM_SERVICE.ID,
                        MM_SERVICE.MESSAGE_CH,
                        this.onNotify);
                    this.microbitUpdateInterval = 50; // milliseconds
                }
                if (this.route === CommunicationRoute.SERIAL) {
                    this.sendCommandInterval = 100; // milliseconds
                } else {
                    this.sendCommandInterval = 30; // milliseconds
                }
                this.initConfig();
                this.bleBusy = false;
                this.startUpdater();
                this.resetConnectionTimeout();
            })
            .catch(err => this._ble.handleDisconnectError(err));
    }

    /**
     * Process the data from the incoming BLE characteristic.
     * @param {string} msg - the incoming BLE data.
     * @private
     */
    onNotify (msg) {
        const data = base64ToUint8Array(msg);
        const dataView = new DataView(data.buffer, 0);
        const dataFormat = dataView.getUint8(19);
        if (dataFormat === MbitMoreDataFormat.ACTION_EVENT) {
            const actionEventType = dataView.getUint8(0);
            if (actionEventType === MbitMoreActionEvent.BUTTON) {
                const buttonName = MbitMoreButtonID[dataView.getUint16(1, true)];
                const eventName = MbitMoreButtonEventID[dataView.getUint8(3)];
                this.buttonEvents[buttonName][eventName] = dataView.getUint32(4, true); // Timestamp
            } else if (actionEventType === MbitMoreActionEvent.GESTURE) {
                const gestureName = MbitMoreGestureID[dataView.getUint8(1)];
                this.gestureEvents[gestureName] = dataView.getUint32(2, true); // Timestamp
            }
        } else if (dataFormat === MbitMoreDataFormat.PIN_EVENT) {
            const pinIndex = dataView.getUint8(0);
            if (!this._pinEvents[pinIndex]) {
                this._pinEvents[pinIndex] = {};
            }
            const event = dataView.getUint8(1);
            this._pinEvents[pinIndex][event] =
            {
                value: dataView.getUint32(2, true), // timesamp of the edge or duration of the pulse
                timestamp: Date.now() // received time
            };
        } else if (dataFormat === MbitMoreDataFormat.DATA_NUMBER) {
            const label = new TextDecoder().decode(data.slice(0, 8).filter(char => (char !== 0)));
            this.receivedData[label] =
            {
                content: dataView.getFloat32(8, true),
                timestamp: Date.now()
            };
        } else if (dataFormat === MbitMoreDataFormat.DATA_TEXT) {
            const label = new TextDecoder().decode(data.slice(0, 8).filter(char => (char !== 0)));
            this.receivedData[label] =
            {
                content: new TextDecoder().decode(data.slice(8, 20).filter(char => (char !== 0))),
                timestamp: Date.now()
            };
        }
        this.resetConnectionTimeout();
    }

    /**
     * Cancel disconnect timeout and start counting again.
     */
    resetConnectionTimeout () {
        if (this._timeoutID) window.clearTimeout(this._timeoutID);
        this._timeoutID = window.setTimeout(() => this._ble.handleDisconnectError(BLEDataStoppedError), BLETimeout);
    }

    /**
     * Return whether the pin value is high.
     * @param {number} pin - the pin to check.
     * @return {boolean} - whether the pin is high or not.
     */
    isPinHigh (pin) {
        const level = this.readDigitalLevel(pin);
        return level === 1;
    }

    /**
     * Read digital input from the pin.
     * @param {number} pin - the pin to read.
     * @return {number} - digital input value of the pin [0|1].
     */
    readDigitalLevel (pin) {
        if (!this.isConnected()) {
            return 0;
        }
        return this.digitalLevel[pin];
    }

    /**
     * Return whether the button is pressed.
     * @param {string} buttonName - name of the button
     * @return {boolean} - true when it is pressed
     */
    isButtonPressed (buttonName) {
        if (!this.isConnected()) {
            return false;
        }
        return this.buttonState[buttonName] === 1;
    }

    /**
     * Return whether the pin is touch-mode.
     * @param {number} pinIndex - indesx of the pin
     * @return {boolean} - true when it is touch-mode
     */
    isPinTouchMode (pinIndex) {
        return this.config.pinMode[pinIndex] === MbitMorePinMode.TOUCH;
    }

    /**
     * Configurate touch mode of the pin.
     * @param {number} pinIndex - index of the pin as a button.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves when configured or undefined if the process was yield.
     */
    configTouchPin (pinIndex, util) {
        if (!this.isConnected()) {
            return Promise.resolve();
        }
        if (this.isPinTouchMode(pinIndex)) {
            return Promise.resolve();
        }
        const sendPromise = this.sendCommandSet(
            [{
                id: (BLECommand.CMD_CONFIG << 5) | MbitMoreConfig.TOUCH,
                message: new Uint8Array([
                    pinIndex,
                    1
                ])
            }],
            util
        );
        if (sendPromise) {
            return sendPromise
                .then(() => {
                    this.config.pinMode[pinIndex] = MbitMorePinMode.TOUCH;
                });
        }
        return;
    }

    /**
     * Return whether the touche-pin is touched.
     * @param {string} buttonName - ID to check.
     * @return {boolean} - whether the id is high or not.
     */
    isTouched (buttonName) {
        if (!this.isConnected()) {
            return false;
        }
        return this.buttonState[buttonName] === 1;
    }

    /**
     * Return the last timestamp of the button event or undefined if the event is not received.
     * @param {MbitMoreButtonName} buttonName - name of the button to get the event.
     * @param {MbitMoreButtonEventName} eventName - name of event to get.
     * @return {?number} Timestamp of the last event or null.
     */
    getButtonEventTimestamp (buttonName, eventName) {
        if (this.buttonEvents[buttonName] && this.buttonEvents[buttonName][eventName]) {
            return this.buttonEvents[buttonName][eventName];
        }
        return null;
    }

    /**
     * Return the last timestamp of the gesture event or undefined if the event is not received.
     * @param {MbitMoreGestureName} gestureName - name of the event.
     * @return {?number} Timestamp of the last event or null.
     */
    getGestureEventTimestamp (gestureName) {
        if (this.gestureEvents[gestureName]) {
            return this.gestureEvents[gestureName];
        }
        return null;
    }

    /**
     * Return the last value of the pin event or undefined if the event was not received.
     * @param {number} pinIndex - index of the pin to get the event.
     * @param {MbitMorePinEvent} event - event to get.
     * @return {?number} Timestamp of the last event or null.
     */
    getPinEventValue (pinIndex, event) {
        if (this._pinEvents[pinIndex] && this._pinEvents[pinIndex][event]) {
            return this._pinEvents[pinIndex][event].value;
        }
        return null;
    }

    /**
     * Return the last timestamp of the pin event or undefined if the event was not received.
     * @param {number} pinIndex - index of the pin to get the event.
     * @param {MbitMorePinEvent} event - event to get.
     * @return {?number} Timestamp of the last event or null.
     */
    getPinEventTimestamp (pinIndex, event) {
        if (this._pinEvents[pinIndex] && this._pinEvents[pinIndex][event]) {
            return this._pinEvents[pinIndex][event].timestamp;
        }
        return null;
    }

    /**
     * Set event type to be get from the pin.
     * @param {number} pinIndex - Index of the pin to set.
     * @param {MbitMorePinEventType} eventType - Event type to set.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
     */
    listenPinEventType (pinIndex, eventType, util) {
        return this.sendCommandSet(
            [{
                id: (BLECommand.CMD_PIN << 5) | MbitMorePinCommand.SET_EVENT,
                message: new Uint8Array([
                    pinIndex,
                    eventType
                ])
            }],
            util
        );
    }

    /**
     * Send data to micro:bit.
     * @param {string} label - label of the data [ascii]
     * @param {string} content - content of the data [ascii | number]
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves when sending done or undefined if this process was yield.
     */
    sendData (label, content, util) {
        const labelData = new Array(8)
            .fill()
            .map((_value, index) => label.charCodeAt(index));
        const contentNumber = Number(content);
        let contentData;
        let type;
        if (Number.isNaN(contentNumber)) {
            type = MbitMoreSendingDataType.TEXT;
            contentData = content
                .split('')
                .map(ascii => ascii.charCodeAt(0))
                .slice(0, 11);
        } else {
            type = MbitMoreSendingDataType.NUMBER;
            const dataView = new DataView(new ArrayBuffer(4));
            dataView.setFloat32(0, contentNumber, true);
            contentData = [
                dataView.getUint8(0),
                dataView.getUint8(1),
                dataView.getUint8(2),
                dataView.getUint8(3)
            ];
        }
        return this.sendCommandSet(
            [{
                id: ((BLECommand.CMD_DATA << 5) | type),
                message: new Uint8Array([
                    ...labelData,
                    ...contentData])
            }],
            util);
    }

    /**
     * Return the last data with the label or undefined if no data received with the label.
     * @param {string} label - label to get.
     * @return {?(number | string)} data of the label or null.
     */
    getDataLabeled (label) {
        if (this.receivedData[label]) {
            return this.receivedData[label].content;
        }
        return null;
    }

    /**
     * Return the last timestamp of the data or undefined if the data is not received.
     * @param {string} label - label of the data.
     * @return {?number} Timestamp of the last data or null.
     */
    getDataTimestamp (label) {
        if (this.receivedData[label]) {
            return this.receivedData[label].timestamp;
        }
        return null;
    }
}

/**
 * Scratch 3.0 blocks to interact with a MicroBit peripheral.
 */
class MbitMoreBlocks {

    /**
     * A translation object which is used in this class.
     * @param {FormatObject} formatter - translation object
     */
    static set formatMessage (formatter) {
        formatMessage = formatter;
        if (formatMessage) setupTranslations();
    }

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return formatMessage({
            id: 'mbitMore.name',
            default: "Seoul Inventor's micro:bit",
            description: 'name of the extension'
        });
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return EXTENSION_ID;
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    static get extensionURL () {
        return extensionURL;
    }

    /**
     * Set URL to get this extension.
     * @param {string} url - URL
     */
    static set extensionURL (url) {
        extensionURL = url;
    }

    /**
     * @return {array} - text and values for each gestures menu element
     */
    get GESTURES_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.gesturesMenu.tiltUp',
                    default: 'titl up',
                    description: 'label for tilt up gesture in gesture picker for microbit more extension'
                }),
                value: MbitMoreGestureName.TILT_UP
            },
            {
                text: formatMessage({
                    id: 'mbitMore.gesturesMenu.tiltDown',
                    default: 'titl down',
                    description: 'label for tilt down gesture in gesture picker for microbit more extension'
                }),
                value: MbitMoreGestureName.TILT_DOWN
            },
            {
                text: formatMessage({
                    id: 'mbitMore.gesturesMenu.tiltLeft',
                    default: 'titl left',
                    description: 'label for tilt left gesture in gesture picker for microbit more extension'
                }),
                value: MbitMoreGestureName.TILT_LEFT
            },
            {
                text: formatMessage({
                    id: 'mbitMore.gesturesMenu.tiltRight',
                    default: 'titl right',
                    description: 'label for tilt right gesture in gesture picker for microbit more extension'
                }),
                value: MbitMoreGestureName.TILT_RIGHT
            },
            {
                text: formatMessage({
                    id: 'mbitMore.gesturesMenu.faceUp',
                    default: 'face up',
                    description: 'label for face up gesture in gesture picker for microbit more extension'
                }),
                value: MbitMoreGestureName.FACE_UP
            },
            {
                text: formatMessage({
                    id: 'mbitMore.gesturesMenu.faceDown',
                    default: 'face down',
                    description: 'label for face down gesture in gesture picker for microbit more extension'
                }),
                value: MbitMoreGestureName.FACE_DOWN
            },
            // {
            //     text: formatMessage({
            //         id: 'mbitMore.gesturesMenu.freefall',
            //         default: 'freefall',
            //         description: 'label for freefall gesture in gesture picker for microbit more extension'
            //     }),
            //     value: MbitMoreGestureName.FREEFALL
            // },
            // {
            //     text: formatMessage({
            //         id: 'mbitMore.gesturesMenu.g3',
            //         default: '3G',
            //         description: 'label for 3G gesture in gesture picker for microbit more extension'
            //     }),
            //     value: MbitMoreGestureName.G3
            // },
            // {
            //     text: formatMessage({
            //         id: 'mbitMore.gesturesMenu.g6',
            //         default: '6G',
            //         description: 'label for 6G gesture in gesture picker for microbit more extension'
            //     }),
            //     value: MbitMoreGestureName.G6
            // },
            // {
            //     text: formatMessage({
            //         id: 'mbitMore.gesturesMenu.g8',
            //         default: '8G',
            //         description: 'label for 3G gesture in gesture picker for microbit more extension'
            //     }),
            //     value: MbitMoreGestureName.G8
            // },
            {
                text: formatMessage({
                    id: 'mbitMore.gesturesMenu.shake',
                    default: 'shake',
                    description: 'label for shaken gesture in gesture picker for microbit more extension'
                }),
                value: MbitMoreGestureName.SHAKE
            }

        ];
    }


    /**
     * @return {array} - text and values for each buttons menu element
     */
    get BUTTON_ID_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.buttonIDMenu.a',
                    default: 'A',
                    description: 'label for "A" element in button picker for Microbit More extension'
                }),
                value: MbitMoreButtonName.A
            },
            {
                text: formatMessage({
                    id: 'mbitMore.buttonIDMenu.b',
                    default: 'B',
                    description: 'label for "B" element in button picker for Microbit More extension'
                }),
                value: MbitMoreButtonName.B
            }
        ];
    }

    /**
     * @return {array} - Menu items for button event selector.
     */
    get BUTTON_EVENT_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.buttonEventMenu.down',
                    default: 'down',
                    description: 'label for button down event'
                }),
                value: MbitMoreButtonEventName.DOWN
            },
            {
                text: formatMessage({
                    id: 'mbitMore.buttonEventMenu.up',
                    default: 'up',
                    description: 'label for button up event'
                }),
                value: MbitMoreButtonEventName.UP
            },
            {
                text: formatMessage({
                    id: 'mbitMore.buttonEventMenu.click',
                    default: 'click',
                    description: 'label for button click event'
                }),
                value: MbitMoreButtonEventName.CLICK
            // },
            // // These events are not in use because they are unstable in coal-microbit-v2.
            // {
            //     text: formatMessage({
            //         id: 'mbitMore.buttonEventMenu.hold',
            //         default: 'hold',
            //         description: 'label for button hold event'
            //     }),
            //     value: MbitMoreButtonEventName.HOLD
            // },
            // {
            //     text: formatMessage({
            //         id: 'mbitMore.buttonEventMenu.longClick',
            //         default: 'long click',
            //         description: 'label for button long click event'
            //     }),
            //     value: MbitMoreButtonEventName.LONG_CLICK
            // },
            // {
            //     text: formatMessage({
            //         id: 'mbitMore.buttonEventMenu.doubleClick',
            //         default: 'double click',
            //         description: 'label for button double click event'
            //     }),
            //     value: MbitMoreButtonEventName.DOUBLE_CLICK
            }
        ];
    }

    /**
     * @return {array} - text and values for each buttons menu element
     */
    get TOUCH_ID_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.touchIDMenu.logo',
                    default: 'LOGO',
                    description: 'label for "LOGO" element in touch button picker for Microbit More extension'
                }),
                value: MbitMoreButtonName.LOGO
            },
            {
                text: 'P0',
                value: MbitMoreButtonName.P0
            },
            {
                text: 'P1',
                value: MbitMoreButtonName.P1
            },
            {
                text: 'P2',
                value: MbitMoreButtonName.P2
            }
        ];
    }

    /**
     * @return {array} - Menu items for touch event selector.
     */
    get TOUCH_EVENT_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.touchEventMenu.touched',
                    default: 'touched',
                    description: 'label for touched event'
                }),
                value: MbitMoreButtonEventName.DOWN
            },
            {
                text: formatMessage({
                    id: 'mbitMore.touchEventMenu.released',
                    default: 'released',
                    description: 'label for released event'
                }),
                value: MbitMoreButtonEventName.UP
            },
            {
                text: formatMessage({
                    id: 'mbitMore.touchEventMenu.tapped',
                    default: 'tapped',
                    description: 'label for tapped event'
                }),
                value: MbitMoreButtonEventName.CLICK
            // },
            // // These events are not in use because they are unstable in coal-microbit-v2.
            // {
            //     text: formatMessage({
            //         id: 'mbitMore.touchEventMenu.hold',
            //         default: 'hold',
            //         description: 'label for hold event in touch'
            //     }),
            //     value: MbitMoreButtonEventName.HOLD
            // },
            // {
            //     text: formatMessage({
            //         id: 'mbitMore.touchEventMenu.longTapped',
            //         default: 'long tapped',
            //         description: 'label for long click event in touch'
            //     }),
            //     value: MbitMoreButtonEventName.LONG_CLICK
            // },
            // {
            //     text: formatMessage({
            //         id: 'mbitMore.touchEventMenu.doubleTapped',
            //         default: 'double tapped',
            //         description: 'label for double click event in touch'
            //     }),
            //     value: MbitMoreButtonEventName.DOUBLE_CLICK
            }
        ];
    }

    get ANALOG_IN_PINS_MENU () {
        return this._peripheral.analogIn.map(
            pinIndex =>
                Object.create({
                    text: `P${pinIndex.toString()}`,
                    value: pinIndex.toString()
                })
        );
    }


    get GPIO_MENU () {
        return this._peripheral.gpio.map(
            pinIndex =>
                Object.create({
                    text: `P${pinIndex.toString()}`,
                    value: pinIndex.toString()
                })
        );
    }

    get DIGITAL_VALUE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.digitalValueMenu.Low',
                    default: 'Low',
                    description: 'label for low value in digital output menu for microbit more extension'
                }),
                value: 'false'
            },
            {
                text: formatMessage({
                    id: 'mbitMore.digitalValueMenu.High',
                    default: 'High',
                    description: 'label for high value in digital output menu for microbit more extension'
                }),
                value: 'true'
            }
        ];
    }

    get AXIS_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.axisMenu.x',
                    default: 'x',
                    description: 'label of X axis.'
                }),
                value: AxisSymbol.X
            },
            {
                text: formatMessage({
                    id: 'mbitMore.axisMenu.y',
                    default: 'y',
                    description: 'label of Y axis.'
                }),
                value: AxisSymbol.Y
            },
            {
                text: formatMessage({
                    id: 'mbitMore.axisMenu.z',
                    default: 'z',
                    description: 'label of Z axis.'
                }),
                value: AxisSymbol.Z
            },
            {
                text: formatMessage({
                    id: 'mbitMore.axisMenu.absolute',
                    default: 'absolute',
                    description: 'label of absolute value.'
                }),
                value: AxisSymbol.Absolute
            }
        ];
    }

    /**
     * @return {array} - text and values for each pin mode menu element
     */
    get PIN_MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.pinModeMenu.pullNone',
                    default: 'pull none',
                    description: 'label for pullNone mode'
                }),
                value: MbitMorePullModeName.NONE
            },
            {
                text: formatMessage({
                    id: 'mbitMore.pinModeMenu.pullUp',
                    default: 'pull up',
                    description: 'label for pullUp mode'
                }),
                value: MbitMorePullModeName.UP
            },
            {
                text: formatMessage({
                    id: 'mbitMore.pinModeMenu.pullDown',
                    default: 'pull down',
                    description: 'label for pullDown mode'
                }),
                value: MbitMorePullModeName.DOWN
            }
        ];
    }

    /**
     * @return {array} - Menu items for event selector.
     */
    get PIN_EVENT_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventMenu.pulseLow',
                    default: 'low pulse',
                    description: 'label for low pulse event'
                }),
                value: 'PULSE_LOW'
            },
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventMenu.pulseHigh',
                    default: 'high pulse',
                    description: 'label for high pulse event'
                }),
                value: 'PULSE_HIGH'
            },
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventMenu.fall',
                    default: 'fall',
                    description: 'label for fall event'
                }),
                value: 'FALL'
            },
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventMenu.rise',
                    default: 'rise',
                    description: 'label for rise event'
                }),
                value: 'RISE'
            }
        ];
    }

    /**
     * @return {array} - Menu items for event selector.
     */
    get PIN_EVENT_TIMESTAMP_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventTimestampMenu.pulseLow',
                    default: 'low pulse',
                    description: 'label for low pulse event'
                }),
                value: 'PULSE_LOW'
            },
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventTimestampMenu.pulseHigh',
                    default: 'high pulse',
                    description: 'label for high pulse event'
                }),
                value: 'PULSE_HIGH'
            },
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventTimestampMenu.fall',
                    default: 'fall',
                    description: 'label for fall event'
                }),
                value: 'FALL'
            },
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventTimestampMenu.rise',
                    default: 'rise',
                    description: 'label for rise event'
                }),
                value: 'RISE'
            }
        ];
    }

    /**
     * @return {array} - Menu items for event listening.
     */
    get PIN_EVENT_TYPE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventTypeMenu.none',
                    default: 'none',
                    description: 'label for remove event listener'
                }),
                value: 'NONE'
            },
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventTypeMenu.pulse',
                    default: 'pulse',
                    description: 'label for pulse event type'
                }),
                value: 'ON_PULSE'
            },
            {
                text: formatMessage({
                    id: 'mbitMore.pinEventTypeMenu.edge',
                    default: 'edge',
                    description: 'label for edge event type'
                }),
                value: 'ON_EDGE'
            }
        ];
    }

    /**
     * @return {array} - Menu items for connection state.
     */
    get CONNECTION_STATE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'mbitMore.connectionStateMenu.connected',
                    default: 'connected',
                    description: 'label for connected'
                }),
                value: 'connected'
            },
            {
                text: formatMessage({
                    id: 'mbitMore.connectionStateMenu.disconnected',
                    default: 'disconnected',
                    description: 'label for disconnected'
                }),
                value: 'disconnected'
            }
        ];
    }

    /**
     * Construct a set of MicroBit blocks.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
        // Create a new MicroBit peripheral instance
        this._peripheral = new MbitMore(this.runtime, MbitMoreBlocks.EXTENSION_ID);

        /**
         * The previous timestamps of button events.
         * @type {Object.<number, Object.<number, number>>} button ID to object with event and timestamp.
         */
        this.prevButtonEvents = {};

        /**
         * The previous timestamps of gesture events.
         * @type {Object.<number, number>} key: event ID, value: timestamp.
         */
        this.prevGestureEvents = {};

        /**
         * The previous timestamps of pin events.
         * @type {Object.<number, Object.<number, number>>} pin index to object with event and timestamp.
         */
        this.prevPinEvents = {};

        /**
         * The previous timestamps of messages.
         * @type {Object.<number, Object>} pin index to object with event and timestamp.
         */
        this.prevReceivedData = {};
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        setupTranslations();
        return {
            id: MbitMoreBlocks.EXTENSION_ID,
            name: MbitMoreBlocks.EXTENSION_NAME,
            extensionURL: MbitMoreBlocks.extensionURL,
            blockIconURI: blockIcon,
            showStatusButton: true,
            blocks: [
                // {
                //     opcode: 'whenConnectionChanged',
                //     text: formatMessage({
                //         id: 'mbitMore.whenConnectionChanged',
                //         default: 'when micro:bit [STATE]',
                //         description: 'when a micro:bit connection state changed'
                //     }),
                //     blockType: BlockType.HAT,
                //     arguments: {
                //         STATE: {
                //             type: ArgumentType.STRING,
                //             menu: 'connectionStateMenu',
                //             defaultValue: 'connected'
                //         }
                //     }
                // },
                // '---',
                {
                    opcode: 'whenButtonEvent',
                    text: formatMessage({
                        id: 'mbitMore.whenButtonEvent',
                        default: 'when button [NAME] is [EVENT]',
                        description: 'when the selected button on the micro:bit get the selected event'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            menu: 'buttonIDMenu',
                            defaultValue: MbitMoreButtonName.A
                        },
                        EVENT: {
                            type: ArgumentType.STRING,
                            menu: 'buttonEventMenu',
                            defaultValue: MbitMoreButtonEventName.DOWN
                        }
                    }
                },
                {
                    opcode: 'isButtonPressed',
                    text: formatMessage({
                        id: 'mbitMore.isButtonPressed',
                        default: 'button [NAME] pressed?',
                        description: 'is the selected button on the micro:bit pressed?'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            menu: 'buttonIDMenu',
                            defaultValue: MbitMoreButtonName.A
                        }
                    }
                },
                // {
                //     opcode: 'whenTouchEvent',
                //     text: formatMessage({
                //         id: 'mbitMore.whenTouchEvent',
                //         default: 'when pin [NAME] is [EVENT]',
                //         description: 'when the selected touch pin on the micro:bit is touched'
                //     }),
                //     blockType: BlockType.HAT,
                //     arguments: {
                //         NAME: {
                //             type: ArgumentType.STRING,
                //             menu: 'touchIDMenu',
                //             defaultValue: MbitMoreButtonName.LOGO
                //         },
                //         EVENT: {
                //             type: ArgumentType.STRING,
                //             menu: 'touchEventMenu',
                //             defaultValue: MbitMoreButtonEventName.DOWN
                //         }
                //     }
                // },
                // {
                //     opcode: 'isPinTouched',
                //     text: formatMessage({
                //         id: 'mbitMore.isPinTouched',
                //         default: 'pin [NAME] is touched?',
                //         description: 'is the selected pin is touched?'
                //     }),
                //     blockType: BlockType.BOOLEAN,
                //     arguments: {
                //         NAME: {
                //             type: ArgumentType.STRING,
                //             menu: 'touchIDMenu',
                //             defaultValue: MbitMoreButtonName.LOGO
                //         }
                //     }
                // },
                '---',
                {
                    opcode: 'whenGesture',
                    text: formatMessage({
                        id: 'mbitMore.whenGesture',
                        default: 'when [GESTURE]',
                        description: 'when the selected gesture is detected by the micro:bit'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        GESTURE: {
                            type: ArgumentType.STRING,
                            menu: 'gestures',
                            defaultValue: MbitMoreGestureName.SHAKE
                        }
                    }
                },
                '---',
                {
                    opcode: 'displayMatrix',
                    text: formatMessage({
                        id: 'mbitMore.displayMatrix',
                        default: 'display pattern [MATRIX] ',
                        description: 'display a pattern on the micro:bit display'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MATRIX: {
                            type: ArgumentType.MATRIX,
                            defaultValue: '0101010101100010101000100'
                        }
                    }
                },
                {
                    opcode: 'displayText',
                    text: formatMessage({
                        id: 'mbitMore.displayText',
                        default: 'display text [TEXT] delay [DELAY] ms',
                        description: 'display text on the micro:bit display'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello!'
                        },
                        DELAY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 120
                        }
                    }
                },
                {
                    opcode: 'displayClear',
                    text: formatMessage({
                        id: 'mbitMore.clearDisplay',
                        default: 'clear display',
                        description: 'display nothing on the micro:bit display'
                    }),
                    blockType: BlockType.COMMAND
                },
                '---',
                {
                    opcode: 'getLightLevel',
                    text: formatMessage({
                        id: 'mbitMore.lightLevel',
                        default: 'light intensity',
                        description: 'how much the amount of light falling on the LEDs on micro:bit'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getTemperature',
                    text: formatMessage({
                        id: 'mbitMore.temperature',
                        default: 'temperature',
                        description: 'temperature (celsius) on the surface of CPU of micro:bit'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getCompassHeading',
                    text: formatMessage({
                        id: 'mbitMore.compassHeading',
                        default: 'angle with the North',
                        description: 'angle from the North to the micro:bit heading direction'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getPitch',
                    text: formatMessage({
                        id: 'mbitMore.pitch',
                        default: 'pitch',
                        description: 'nose up movement of the micro:bit from level'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getRoll',
                    text: formatMessage({
                        id: 'mbitMore.roll',
                        default: 'roll',
                        description: 'clockwise circular movement of the micro:bit from level'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getSoundLevel',
                    text: formatMessage({
                        id: 'mbitMore.soundLevel',
                        default: 'sound level',
                        description: 'level of the sound from microphone on micro:bit'
                    }),
                    blockType: BlockType.REPORTER
                },
                // {
                //     opcode: 'getMagneticForce',
                //     text: formatMessage({
                //         id: 'mbitMore.magneticForce',
                //         default: 'magnetic force',
                //         description: 'value of magnetic force (micro tesla)'
                //     }),
                //     blockType: BlockType.REPORTER,
                //     arguments: {
                //         AXIS: {
                //             type: ArgumentType.STRING,
                //             menu: 'axis',
                //             defaultValue: AxisSymbol.Absolute
                //         }
                //     }
                // },
                {
                    opcode: 'getAcceleration',
                    text: formatMessage({
                        id: 'mbitMore.acceleration',
                        default: 'acceleration [AXIS]',
                        description: 'value of acceleration on the axis (milli-g)'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'axis',
                            defaultValue: AxisSymbol.X
                        }
                    }
                },
                '---',
                {
                    opcode: 'getAnalogValue',
                    text: formatMessage({
                        id: 'mbitMore.analogValue',
                        default: 'analog value of pin [PIN]',
                        description: 'analog input value of the pin'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'analogInPins',
                            defaultValue: '0'
                        }
                    }
                },
                // {
                //     opcode: 'setPullMode',
                //     text: formatMessage({
                //         id: 'mbitMore.setPullMode',
                //         default: 'set pin [PIN] to input [MODE]',
                //         description: 'set a pin into the mode'
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         PIN: {
                //             type: ArgumentType.STRING,
                //             menu: 'gpio',
                //             defaultValue: '0'
                //         },
                //         MODE: {
                //             type: ArgumentType.STRING,
                //             menu: 'pinMode',
                //             defaultValue: MbitMorePullModeName.UP
                //         }
                //     }
                // },
                {
                    opcode: 'isPinHigh',
                    text: formatMessage({
                        id: 'mbitMore.isPinHigh',
                        default: '[PIN] pin is high?',
                        description: 'is the selected pin high as digital?'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        }
                    }
                },
                '---',
                {
                    opcode: 'setDigitalOut',
                    text: formatMessage({
                        id: 'mbitMore.setDigitalOut',
                        default: 'set [PIN] Digital [LEVEL]',
                        description: 'set pin to Digital Output mode and the level(High = true)'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        },
                        LEVEL: {
                            type: ArgumentType.STRING,
                            menu: 'digitalValueMenu',
                            defaultValue: 'false'
                        }
                    }
                },
                {
                    opcode: 'setAnalogOut',
                    text: formatMessage({
                        id: 'mbitMore.setAnalogOut',
                        default: 'set [PIN] analog [LEVEL] %',
                        description: 'set pin to PWM mode and the level(0 to 1023)'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        },
                        LEVEL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                '---',
                {
                    opcode: 'setServo',
                    text: formatMessage({
                        id: 'mbitMore.setServo',
                        default: 'set [PIN] Servo [ANGLE]',
                        description: 'set pin to Servo mode and the angle(0 to 180)'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        },
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        RANGE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2000
                        },
                        CENTER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1500
                        }
                    }
                },
                // {
                //     opcode: 'playTone',
                //     text: formatMessage({
                //         id: 'mbitMore.playTone',
                //         default: 'play tone [FREQ] Hz volume [VOL] %',
                //         description: 'play tone on the speaker'
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         FREQ: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 440
                //         },
                //         VOL: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 100
                //         }
                //     }
                // },
                // {
                //     opcode: 'stopTone',
                //     text: formatMessage({
                //         id: 'mbitMore.stopTone',
                //         default: 'stop tone',
                //         description: 'stop tone on the speaker'
                //     }),
                //     blockType: BlockType.COMMAND
                // },
                '---',
                {
                    opcode: 'listenPinEventType',
                    text: formatMessage({
                        id: 'mbitMore.listenPinEventType',
                        default: 'listen [EVENT_TYPE] event on [PIN]',
                        description: 'listen the event on the pin'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        EVENT_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'pinEventTypeMenu',
                            defaultValue: 'NONE'
                        },
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'whenPinEvent',
                    text: formatMessage({
                        id: 'mbitMore.whenPinEvent',
                        default: 'when catch [EVENT] at pin [PIN]',
                        description: 'when catch the event at the pin'

                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        EVENT: {
                            type: ArgumentType.STRING,
                            menu: 'pinEventMenu',
                            defaultValue: 'PULSE_LOW'
                        },
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'getPinEventValue',
                    text: formatMessage({
                        id: 'mbitMore.getPinEventValue',
                        default: 'value of [EVENT] at [PIN]',
                        description: 'value of the value of the event (timestamp of the edge or duration of the pulse)'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        EVENT: {
                            type: ArgumentType.STRING,
                            menu: 'pinEventTimestampMenu',
                            defaultValue: 'PULSE_LOW'
                        },
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'gpio',
                            defaultValue: '0'
                        }
                    }
                // },
                // '---',
                // {
                //     opcode: 'whenDataReceived',
                //     text: formatMessage({
                //         id: 'mbitMore.whenDataReceived',
                //         default: 'when data with label [LABEL] received from micro:bit',
                //         description: 'when the data which has the label received'
                //     }),
                //     blockType: BlockType.HAT,
                //     arguments: {
                //         LABEL: {
                //             type: ArgumentType.STRING,
                //             defaultValue: 'label-01'
                //         }
                //     }
                // },
                // {
                //     opcode: 'getDataLabeled',
                //     text: formatMessage({
                //         id: 'mbitMore.getDataLabeled',
                //         default: 'data of label [LABEL]',
                //         description: 'the last data which has the label'
                //     }),
                //     blockType: BlockType.REPORTER,
                //     arguments: {
                //         LABEL: {
                //             type: ArgumentType.STRING,
                //             defaultValue: 'label-01'
                //         }
                //     }
                // },
                // {
                //     opcode: 'sendData',
                //     text: formatMessage({
                //         id: 'mbitMore.sendData',
                //         default: 'send data [DATA] with label [LABEL] to micro:bit',
                //         description: 'send data content with label to micro:bit'
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         LABEL: {
                //             type: ArgumentType.STRING,
                //             defaultValue: 'label-01'
                //         },
                //         DATA: {
                //             type: ArgumentType.STRING,
                //             defaultValue: 'data'
                //         }
                //     }
                }
            ],
            menus: {
                buttonIDMenu: {
                    acceptReporters: false,
                    items: this.BUTTON_ID_MENU
                },
                buttonEventMenu: {
                    acceptReporters: false,
                    items: this.BUTTON_EVENT_MENU
                },
                touchIDMenu: {
                    acceptReporters: false,
                    items: this.TOUCH_ID_MENU
                },
                touchEventMenu: {
                    acceptReporters: false,
                    items: this.TOUCH_EVENT_MENU
                },
                gestures: {
                    acceptReporters: false,
                    items: this.GESTURES_MENU
                },
                analogInPins: {
                    acceptReporters: false,
                    items: this.ANALOG_IN_PINS_MENU
                },
                digitalValueMenu: {
                    acceptReporters: true,
                    items: this.DIGITAL_VALUE_MENU
                },
                gpio: {
                    acceptReporters: false,
                    items: this.GPIO_MENU
                },
                axis: {
                    acceptReporters: false,
                    items: this.AXIS_MENU
                },
                pinMode: {
                    acceptReporters: false,
                    items: this.PIN_MODE_MENU
                },
                pinEventTypeMenu: {
                    acceptReporters: false,
                    items: this.PIN_EVENT_TYPE_MENU
                },
                pinEventMenu: {
                    acceptReporters: false,
                    items: this.PIN_EVENT_MENU
                },
                pinEventTimestampMenu: {
                    acceptReporters: false,
                    items: this.PIN_EVENT_TIMESTAMP_MENU
                },
                connectionStateMenu: {
                    acceptReporters: false,
                    items: this.CONNECTION_STATE_MENU
                }
            },
            translationMap: translations
        };
    }

    /**
     * Update the previous occured time of all button events.
     */
    updatePrevButtonEvents () {
        this.prevButtonEvents = {};
        Object.entries(this._peripheral.buttonEvents).forEach(([componentID, events]) => {
            this.prevButtonEvents[componentID] = {};
            Object.entries(events).forEach(([eventName, timestamp]) => {
                this.prevButtonEvents[componentID][eventName] = timestamp;
            });
        });
    }

    /**
     * Test whether the event raised at the button.
     * @param {object} args - the block's arguments.
     * @param {string} args.NAME - name of the button.
     * @param {string} args.EVENT - name of event to catch.
     * @return {boolean} - true if the event raised.
     */
    whenButtonEvent (args) {
        if (!this.updateLastButtonEventTimer) {
            this.updateLastButtonEventTimer = setTimeout(() => {
                this.updatePrevButtonEvents();
                this.updateLastButtonEventTimer = null;
            }, this.runtime.currentStepTime);
        }
        const buttonName = args.NAME;
        const eventName = args.EVENT;
        const lastTimestamp =
            this._peripheral.getButtonEventTimestamp(buttonName, eventName);
        if (lastTimestamp === null) return false;
        if (!this.prevButtonEvents[buttonName]) return true;
        return lastTimestamp !== this.prevButtonEvents[buttonName][eventName];
    }

    /**
     * Test whether the A or B button is pressed
     * @param {object} args - the block's arguments.
     * @param {string} args.NAME - name of the button.
     * @param {object} util - utility object provided by the runtime.
     * @return {boolean} - whether the button is pressed or not.
     */
    isButtonPressed (args) {
        const buttonName = args.NAME;
        return this._peripheral.isButtonPressed(buttonName);
    }


    /**
     * Test whether the touch event raised at the pin.
     * @param {object} args - the block's arguments.
     * @param {string} args.NAME - name of the pin to catch.
     * @param {string} args.EVENT - event to catch.
     * @param {object} util - utility object provided by the runtime.
     * @return {boolean|Promise<boolean>|undefined} - true if the event raised or promise that or undefinde if yield.
     */
    whenTouchEvent (args, util) {
        const buttonName = args.NAME;
        if (buttonName === MbitMoreButtonName.LOGO) {
            return this.whenButtonEvent(args);
        }
        if (this._peripheral.isPinTouchMode(MbitMoreButtonPinIndex[buttonName])) {
            return this.whenButtonEvent(args);
        }
        const configPromise = this._peripheral.configTouchPin(MbitMoreButtonPinIndex[buttonName], util);
        if (!configPromise) return; // This thread was yielded.
        return configPromise.then(() => this.whenButtonEvent(args));
    }

    /**
     * Test whether the touch-pin is touched.
     * @param {object} args - the block's arguments.
     * @param {string} args.NAME - name of the pin.
     * @param {object} util - utility object provided by the runtime.
     * @return {boolean|Promise<boolean>|undefined} - true if touched or promise that or undefinde if yield.
     */
    isPinTouched (args, util) {
        const buttonName = args.NAME;
        if (buttonName === MbitMoreButtonName.LOGO) {
            return this._peripheral.isTouched(buttonName);
        }
        if (this._peripheral.isPinTouchMode(MbitMoreButtonPinIndex[buttonName])) {
            return this._peripheral.isTouched(buttonName);
        }
        const configPromise = this._peripheral.configTouchPin(MbitMoreButtonPinIndex[buttonName], util);
        if (!configPromise) return; // This thread was yielded.
        return configPromise.then(() => this._peripheral.isTouched(buttonName));
    }

    /**
     * Update the last occured time of all gesture events.
     */
    updatePrevGestureEvents () {
        this.prevGestureEvents = {};
        Object.entries(this._peripheral.gestureEvents).forEach(([gestureName, timestamp]) => {
            this.prevGestureEvents[gestureName] = timestamp;
        });
    }

    /**
     * Test whether the gesture event raised.
     * @param {object} args - the block's arguments.
     * @param {string} args.GESTURE - name of the gesture.
     * @return {boolean} - true if the event raised.
     */
    whenGesture (args) {
        if (!this.updateLastGestureEventTimer) {
            this.updateLastGestureEventTimer = setTimeout(() => {
                this.updatePrevGestureEvents();
                this.updateLastGestureEventTimer = null;
            }, this.runtime.currentStepTime);
        }
        const gestureName = args.GESTURE;
        const lastTimestamp =
            this._peripheral.getGestureEventTimestamp(gestureName);
        if (lastTimestamp === null) return false;
        if (!this.prevGestureEvents[gestureName]) return true;
        return lastTimestamp !== this.prevGestureEvents[gestureName];
    }

    /**
     * Display pixcel pattern on the 5x5 LED matrix with brightness and write mode.
     * @param {object} args - the block's arguments.
     * @param {string} args.MATRIX - the pattern of the pixels.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves after a tick or undefinde if yield.
     */
    displayMatrix (args, util) {
        const matrixString = Cast.toString(args.MATRIX)
            .replace(/[０-９，]/g, ws => String.fromCharCode(ws.charCodeAt(0) - 0xFEE0)); // zenkaku to hankaku
        let matrixData;
        if (matrixString.includes(',')) {
            // comma separated values
            matrixData = matrixString.split(/[,\n]/);
        } else if (/[ \t]\d*[ \t]/g.test(matrixString)) {
            // space|tab separated values
            matrixData = matrixString.split(/\s/g);
        } else {
            // 0|1 pattern.
            matrixData = matrixString.replace(/\s/g, '')
                .split('');
            matrixData = matrixData.map(level => ((level === '0') ? 0 : 100));
        }
        matrixData = matrixData.map(brightness =>
            (Math.max(0,
                Math.min(100,
                    Number(brightness)) * 255 / 100))); // percent to 8bits value
        const matrix = [];
        for (let line = 0; line < 5; line++) {
            matrix[line] = [];
            for (let col = 0; col < 5; col++) {
                matrix[line][col] = matrixData[(line * 5) + col];
            }
        }
        return this._peripheral.displayPixels(matrix, util);
    }

    /**
     * Display text on the 5x5 LED matrix.
     * Displayable character is ascii and non-ascii is replaced to '?'.
     * @param {object} args - the block's arguments.
     * @param {string} args.TEXT - The contents to display.
     * @param {number} args.DELAY - The time to delay between characters, in milliseconds.
     * @param {object} util - utility object provided by the runtime.
     * @return {Promise} - a Promise that resolves after the text is done printing or undefinde if yield.
     * Note the limit is 18 characters
     * The print time is calculated by multiplying the number of horizontal pixels
     * by the default scroll delay of 120ms.
     * The number of horizontal pixels = 6px for each character in the string,
     * 1px before the string, and 5px after the string.
     */
    displayText (args, util) {
        // zenkaku to hankaku
        const text = Cast.toString(args.TEXT)
            .replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, ws => String.fromCharCode(ws.charCodeAt(0) - 0xFEE0))
            .replace(/”/g, '"')
            .replace(/’/g, "'")
            .replace(/‘/g, '`')
            .replace(/￥/g, '\\')
            // eslint-disable-next-line no-irregular-whitespace
            .replace(/　/g, ' ')
            .replace(/〜/g, '~');
        let delay = parseInt(args.DELAY, 10);
        delay = isNaN(delay) ? 120 : delay; // Use default delay if NaN.
        const resultPromise = this._peripheral.displayText(text, delay, util);
        if (!resultPromise) return; // This thread was yielded.
        const yieldDelay = delay * ((6 * text.length) + 6);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, yieldDelay);
        });
    }

    /**
     * Turn all 5x5 matrix LEDs off.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @return {Promise} - a Promise that resolves after a tick or undefinde if yield.
     */
    displayClear (args, util) {
        const matrix = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        return this._peripheral.displayPixels(matrix, util);
    }

    /**
     * Test the selected pin is high as digital.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @return {boolean} - true if the pin is high.
     */
    isPinHigh (args) {
        return this._peripheral.isPinHigh(parseInt(args.PIN, 10));
    }

    /**
     * Get amount of light (0 - 255) on the LEDs.
     * @param {object} args - the block's arguments.
     * @return {number} - light level.
     */
    getLightLevel () {
        const level = this._peripheral.readLightLevel();
        return Math.round(level * 1000 / 255) / 10;
    }

    /**
     * Get temperature (integer in celsius) of micro:bit.
     * @param {object} args - the block's arguments.
     * @return {number} - value of temperature [centigrade].
     */
    getTemperature () {
        return this._peripheral.readTemperature();
    }

    /**
     * Get loudness of the sound from microphone on micro:bit.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @return {Promise} - a Promise that resolves digital input value of the pin or undefinde if yield.
     */
    getSoundLevel (args, util) {
        const resultPromise = this._peripheral.configMic(true, util);
        if (!resultPromise) return; // This thread was yielded.
        return resultPromise
            .then(micState => {
                if (micState) {
                    return Math.round(this._peripheral.readSoundLevel() * 1000 / 255) / 10;
                }
                return 0;
            });
    }

    /**
     * Return angle from the north to the micro:bit heading direction.
     * @return {number} - degree of compass heading angle from the north (0 - 359 degrees).
     */
    getCompassHeading () {
        return this._peripheral.readCompassHeading();
    }

    /**
     * Return analog value of the pin.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} a Promise that resolves analog input value of the pin or undefined if this process was yield.
     */
    getAnalogValue (args, util) {
        const pinIndex = parseInt(args.PIN, 10);
        const resultPromise = this._peripheral.readAnalogIn(pinIndex, util);
        if (!resultPromise) return;
        return resultPromise.then(level => Math.round(level * 100 * 10 / 1024) / 10);
    }

    /**
     * Return digital value of the pin.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @return {number} - digital input value of the pin.
     */
    getDigitalValue (args) {
        return this._peripheral.readDigitalLevel(parseInt(args.PIN, 10));
    }

    /**
     * Send data with label.
     * @param {object} args - the block's arguments.
     * @property {string} args.LABEL - label of the data.
     * @property {string} args.DATA - content of the data.
     * @param {object} util - utility object provided by the runtime.
     * @return {?Promise} - a Promise that resolves when the process was done or undefined if this process was yield.
     */
    sendData (args, util) {
        if (args.LABEL.length <= 0) {
            return;
        }
        return this._peripheral.sendData(args.LABEL, args.DATA, util);
    }

    /**
     * Set pull mode of the pin.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {MbitMorePullModeName} args.MODE - mode to set.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    setPullMode (args, util) {
        return this._peripheral.setPullMode(parseInt(args.PIN, 10), MbitMorePullModeID[args.MODE], util);
    }

    /**
     * Set the pin to Output mode and level.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {boolean | string | number} args.LEVEL - value to be set.
     * @param {object} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    setDigitalOut (args, util) {
        let level = (args.LEVEL === true);
        level = level || (args.LEVEL === 'true');
        if (!level) {
            const num = Number(args.LEVEL);
            if (!isNaN(num)) {
                level = (num > 0);
            }
        }
        return this._peripheral.setPinOutput(parseInt(args.PIN, 10), level, util);
    }

    /**
     * Set the pin to PWM mode and level.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {number} args.LEVEL - value[%] for PWM.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    setAnalogOut (args, util) {
        let percent = parseInt(args.LEVEL, 10);
        if (isNaN(percent)) {
            return;
        }
        percent = Math.max(0, Math.min(percent, 100));
        const level = Math.round(percent * 1024 / 100);
        return this._peripheral.setPinPWM(
            parseInt(args.PIN, 10),
            level,
            util
        );
    }

    /**
     * Set the pin to Servo mode and angle.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    setServo (args, util) {
        let angle = parseInt(args.ANGLE, 10);
        if (isNaN(angle)) return;
        angle = Math.max(0, angle);
        angle = Math.min(angle, 180);
        // let range = parseInt(args.RANGE, 10);
        // if (isNaN(range)) range = 0;
        // range = Math.max(0, range);
        // let center = parseInt(args.CENTER, 10);
        // if (isNaN(center)) range = 0;
        // center = Math.max(0, center);
        return this._peripheral.setPinServo(parseInt(args.PIN, 10), angle, null, null, util);
    }

    /**
     * Return the value of magnetic force [micro tesla] on axis.
     * @param {object} args - the block's arguments.
     * @property {AxisSymbol} AXIS - the axis (X, Y, Z, Absolute).
     * @return {number} - value of magnetic force.
     */
    getMagneticForce (args) {
        return this._peripheral.readMagneticForce(args.AXIS);
    }

    /**
     * Return the value of acceleration on the specified axis.
     * @param {object} args - the block's arguments.
     * @param {AxisSymbol} args.AXIS - direction to get.
     * @return {number} - value of acceleration.
     */
    getAcceleration (args) {
        return this._peripheral.readAcceleration(args.AXIS);
    }

    /**
     * Return pitch [degrees] of the micro:bit heading direction.
     * @return {number} - degree of pitch.
     */
    getPitch () {
        return this._peripheral.readPitch();
    }

    /**
     * Read roll [degrees] of the micro:bit heading direction.
     * @return {number} - degree of roll.
     */
    getRoll () {
        return this._peripheral.readRoll();
    }


    /**
     * Play tone on the speaker.
     * @param {object} args - the block's arguments.
     * @param {string} args.FREQ - wave frequency to play
     * @param {string} args.VOL laudness of tone
     * @param {object} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    playTone (args, util) {
        const frequency = parseFloat(args.FREQ);
        let volume = parseInt(args.VOL, 10);
        volume = Math.min(100, (Math.max(0, volume)));
        return this._peripheral.playTone(frequency, volume, util);
    }

    /**
     * Stop playing tone on the speaker.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
     */
    stopTone (args, util) {
        return this._peripheral.stopTone(util);
    }

    /**
     * Set listening event type at the pin.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {string} args.EVENT_TYPE - event to listen.
     * @param {BlockUtility} util - utility object provided by the runtime.
     * @return {promise | undefined} - a Promise that resolves when the command was sent
     *                                 or undefined if this process was yield.
    */
    listenPinEventType (args, util) {
        return this._peripheral.listenPinEventType(parseInt(args.PIN, 10), MbitMorePinEventType[args.EVENT_TYPE], util);
    }

    /**
     * Rerutn value (timestamp of the edge or duration of the pulse) of the event or 0 when the event is not received.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {string} args.EVENT - event value to get.
     * @param {object} util - utility object provided by the runtime.
     * @return {number} - timestamp of the event or 0.
     */
    getPinEventValue (args) {
        const value = this._peripheral.getPinEventValue(parseInt(args.PIN, 10), MbitMorePinEvent[args.EVENT]);
        return value ? value : 0;
    }

    /**
     * Update the previous occured time of all pin events.
     */
    updatePrevPinEvents () {
        this.prevPinEvents = {};
        Object.entries(this._peripheral._pinEvents).forEach(([pinIndex, events]) => {
            this.prevPinEvents[pinIndex] = {};
            Object.entries(events).forEach(([eventID, eventData]) => {
                this.prevPinEvents[pinIndex][eventID] = {};
                Object.entries(eventData).forEach(([key, value]) => {
                    this.prevPinEvents[pinIndex][eventID][key] = value;
                });
            });
        });
    }

    /**
     * Return the previous timestamp of the pin event or undefined if the event was not received.
     * @param {number} pinIndex - index of the pin to get the event.
     * @param {MbitMorePinEvent} eventID - ID of the event to get.
     * @return {?number} Timestamp of the previous event or null.
     */
    getPrevPinEventTimestamp (pinIndex, eventID) {
        if (this.prevPinEvents[pinIndex] && this.prevPinEvents[pinIndex][eventID]) {
            return this.prevPinEvents[pinIndex][eventID].timestamp;
        }
        return null;
    }

    /**
     * Test whether the event raised at the pin.
     * @param {object} args - the block's arguments.
     * @param {number} args.PIN - pin ID.
     * @param {string} args.EVENT - event to catch.
     * @return {boolean} - true if the event raised.
     */
    whenPinEvent (args) {
        if (!this.updateLastPinEventTimer) {
            this.updateLastPinEventTimer = setTimeout(() => {
                this.updatePrevPinEvents();
                this.updateLastPinEventTimer = null;
            }, this.runtime.currentStepTime);
        }
        const pinIndex = parseInt(args.PIN, 10);
        const eventID = MbitMorePinEvent[args.EVENT];
        const lastTimestamp =
            this._peripheral.getPinEventTimestamp(pinIndex, eventID);
        if (lastTimestamp === null) return false;
        const prevTimestamp = this.getPrevPinEventTimestamp(pinIndex, eventID);
        if (prevTimestamp === null) return true;
        return lastTimestamp !== prevTimestamp;
    }

    /**
     * Rerutn the last content of the messge or undefined if the data which has the label is not received.
     * @param {object} args - the block's arguments.
     * @param {number} args.LABEL - label of the data.
     * @return {?(string | number)} - content of the data or empty string when the data was null
     */
    getDataLabeled (args) {
        const data = this._peripheral.getDataLabeled(args.LABEL);
        if (data === null) {
            return '';
        }
        return data;
    }

    /**
     * Update the previous occured time of all received data.
     */
    updatePrevReceivedData () {
        this.prevReceivedData = {};
        Object.entries(this._peripheral.receivedData).forEach(([label, contentObject]) => {
            this.prevReceivedData[label] = {};
            Object.entries(contentObject).forEach(([key, value]) => {
                this.prevReceivedData[label][key] = value;
            });
        });
    }

    /**
     * Return the previous timestamp of the data or undefined if the data was not received.
     * @param {string} label - label of the data.
     * @return {?number} Timestamp of the previous data or null.
     */
    getPrevReceivedDataTimestamp (label) {
        if (this.prevReceivedData[label]) {
            return this.prevReceivedData[label].timestamp;
        }
        return null;
    }

    /**
     * Test whether the data received which had the label.
     * @param {object} args - the block's arguments.
     * @param {number} args.LABEL - label of the data.
     * @return {boolean} - true if the data received.
     */
    whenDataReceived (args) {
        if (!this.updateLastDataTimer) {
            this.updateLastDataTimer = setTimeout(() => {
                this.updatePrevReceivedData();
                this.updateLastDataTimer = null;
            }, this.runtime.currentStepTime);
        }
        const label = args.LABEL;
        const lastTimestamp =
            this._peripheral.getDataTimestamp(label);
        if (lastTimestamp === null) return false;
        const prevTimestamp = this.getPrevReceivedDataTimestamp(label);
        if (prevTimestamp === null) return true;
        return lastTimestamp !== prevTimestamp;
    }

    /**
     * Test whether a micro:bit connected.
     * @param {object} args - the block's arguments.
     * @property {string} args.STATE - the state of connection to check.
     * @return {boolean} - true if the state is matched.
     */
    whenConnectionChanged (args) {
        const state = (args.STATE === 'connected');
        return (state === this._peripheral.isConnected());
    }
}

// export {
//     MbitMoreBlocks as default,
//     MbitMoreBlocks as blockClass
// };
module.exports = MbitMoreBlocks;
