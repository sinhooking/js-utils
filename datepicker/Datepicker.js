// DatePickerHandler constructor
export function DatePickerHandler(options) {
    this._DATEPICKER_PIVOT = options.pivot;

    /**
     * TIME OPTIONS
     */
    this._FREE_TEST_TIME = options.datepickerTime.elementName;
    this._FREE_TEST_TIME_CREATE_OPTION = {
        startIndex: options.datepickerTime.startLoopIndex,
        loopLength: options.datepickerTime.createElementLoopCount,
        optionsContent: '시'
    }

    /**
     * MINUTE OPTIONS
     */
    this._FREE_TEST_MINUTES = options.datepickerMinute.elementName
    this._FREE_TEST_MINUTES_CREATE_OPTION = {
        startIndex: options.datepickerMinute.startLoopIndex,
        loopLength: options.datepickerMinute.createElementLoopCount,
        optionsContent: '분'
    }

    this._ADD_GET_HOURS = options.addHours;
}

// DatePickerHandler getter
DatePickerHandler.prototype.datepickerStart = function (options) {
    return $(this.datepickerPivot()).datepicker();
}
DatePickerHandler.prototype.getDatePickerDate = function () {
    var $datepickerDate = this.datepickerElement().datepicker('getDate');
    if (this.hasValue($datepickerDate)) {
        return $datepickerDate.getDate();
    } else {
        return console.warn('datepicker "DATE" is not found');
    }
}
DatePickerHandler.prototype.hasValue = function (object) {
    return object && object !== null;
}
DatePickerHandler.prototype.getDatepickerHasValue = function () {
    return this.datepickerElement().val().length === 0;
}
DatePickerHandler.prototype.freetestTimeElement = function () {
    return $(this.freetestTime());
}
DatePickerHandler.prototype.freetestTimeElementValue = function () {
    return $(this.freetestTime()).val();
}
DatePickerHandler.prototype.isTodayHours = function () {
    return this.selectIsToday() && this.getAddedHours() === +this.freetestTimeElementValue();
}
DatePickerHandler.prototype.disableCheckMinute = function (elementVal) {
    return new Date().getMinutes() > elementVal;
}
DatePickerHandler.prototype.isLastElement = function (element) {
    return $(element).next().length === 0;
}
DatePickerHandler.prototype.selectIsToday = function () {
    return this.getDatePickerDate() === new Date().getDate();
}
DatePickerHandler.prototype.getAddedHours = function () {
    return new Date().getHours() + this._ADD_GET_HOURS;
}
DatePickerHandler.prototype.datepickerPivot = function () {
    return this._DATEPICKER_PIVOT;
}
DatePickerHandler.prototype.datepickerElement = function () {
    return $(this.datepickerPivot());
}
DatePickerHandler.prototype.freetestTime = function () {
    return this._FREE_TEST_TIME;
}
DatePickerHandler.prototype.freetestTimeOption = function () {
    return this._FREE_TEST_TIME_CREATE_OPTION;
}
DatePickerHandler.prototype.freetestMinute = function () {
    return this._FREE_TEST_MINUTES;
}
DatePickerHandler.prototype.freetestMinuteOption = function () {
    return this._FREE_TEST_MINUTES_CREATE_OPTION;
}
DatePickerHandler.prototype.isTimeElement = function (element) {
    return $(element).parent().prop('name').indexOf('time') === -1;
}
DatePickerHandler.prototype.selectedIsBigger = function () {
    // selected time is bigger or equal in size an "pivot time"
    return this.getDatepickerHasValue() || this.getAddedHours() >= +this.freetestTimeElementValue();
}
// DatePickerHandler getter end

// DatePickerHandler static methods
DatePickerHandler.prototype.setDefaults = function (options) {
    return $.datepicker.setDefaults(options);
}
DatePickerHandler.prototype.setDefaultDate = function (callback) {
    this.datepickerElement().datepicker("setDate", new Date());

    if (!callback || callback === null) {
        return this.dateAndTimeChangeHandler();
    } else {
        return callback();
    }
}
DatePickerHandler.prototype.createVirtualElements = function (timeOrMinutes) {
    var timeOrMinutes = timeOrMinutes || 'time';

    var timeOrMinuteOption = timeOrMinutes === 'time' ?
        this.freetestTimeOption() : this.freetestMinuteOption();

    if (!document.createDocumentFragment && document.createDocumentFragment === null) {
        return console.error('Browser is not support an "Fragment API"')
    }

    var docFrag = document.createDocumentFragment();

    for (var i = 0; i < timeOrMinuteOption.loopLength; i += 1) {
        var optionElement = document.createElement('option');
        var number = i + timeOrMinuteOption.startIndex;

        /**
        *  multiple 10;
        */
        if (timeOrMinuteOption.optionsContent === '분') {
            number *= 10;
        }

        /**
        * time: (0, 1, 2, ..24)
        * minutes: (0, 10, 20, 30)
        */
        optionElement.value = number;

        /**
        * time: (0, 1, 2, ..24) "시"
        *   - interface : timeOptionInterface
        * minutes: (0, 10, 20, 30) "분"
        *   - interface : minuteOptionInterface
        */
        optionElement.textContent = number + timeOrMinuteOption.optionsContent;
        docFrag.append(optionElement);
    }

    return docFrag;
}
DatePickerHandler.prototype.appendVirtualElements = function (options, callback) {
    var callbackObject = {};

    var timeElement = this.freetestTime();
    var minuteElement = this.freetestMinute();

    var selectTimeConfig = this.createVirtualElements();
    var selectMinuteConfig = this.createVirtualElements('minute');

    if (options === undefined) {
        callbackObject.timeElement = timeElement;
        callbackObject.minuteElement = minuteElement;

        $(timeElement).append(selectTimeConfig);
        return $(minuteElement).append(selectMinuteConfig);
    }

    if (options.time && options.time !== null) {
        callbackObject.timeElement = timeElement;
        return $(timeElement).append(selectTimeConfig);
    }

    if (options.minute && options.minute !== null) {
        callbackObject.minuteElement = minuteElement;
        return $(minuteElement).append(selectMinuteConfig);
    }

    if (callback && callback !== null) {
        return callback(callbackObject);
    } else {
        delete callbackObject;
    }
}
//DatePickerHandler static methods end

// DatePickerHandler iterating methods
DatePickerHandler.prototype.elementUnDisabledIterator = function (targetNames, callback) {
    var callback = callback || localDisabledIterator;
    var _this_ = this;
    return targetNames.map(localIterator);

    function localIterator(targetName) {
        return $(targetName).children('option').each(function (index, element) {
            return callback(index, element, _this_);
        });
    }

    /*
    * if callback is undefined
    */
    function localDisabledIterator(index, element) {
        return $(element).prop('disabled', false);
    }
}
DatePickerHandler.prototype.timeAndMinuteIterator = function (index, element, _this_) {
    var timeOrMinutesOption = _this_.isTimeElement(element) ?
        _this_.disableCheckMinute : _this_.disalbeCheckTimeOption;
    if (timeOrMinutesOption($(element).val(), _this_) === true) {
        return _this_.timeAndMinuteSelectConfig(element, _this_);
    }
}
DatePickerHandler.prototype.disalbeCheckTimeOption = function (elementVal, _this_) {
    var ADDED_HOURS = _this_.getAddedHours();
    /**
    * ADDED_HOURS cycle is 24 time
    *  if current hours euql ADDED_HOURSE initialize hours
    *  if ADDED_HOURS is larger then current hours (-= 24);
    */
    if (ADDED_HOURS === 24) {
        ADDED_HOURS = 0;
    }

    if (ADDED_HOURS > 24) {
        ADDED_HOURS -= 24;
    }

    return ADDED_HOURS > +elementVal;
}

// DatePickerHandler elementHandler methods
DatePickerHandler.prototype.elementUnDisabledIterator = function (targetNames, callback) {
    var callback = callback || localDisabledIterator;
    var _this_ = this;
    return targetNames.map(localIterator);

    function localIterator(targetName) {
        return $(targetName).children('option').each(function (index, element) {
            return callback(index, element, _this_);
        });
    }

    /*
    * if callback is undefined
    */
    function localDisabledIterator(index, element) {
        return $(element).prop('disabled', false);
    }
}
DatePickerHandler.prototype.nextElementSelect = function (element) {
    $(element).prop('selected', false);
    $(element).next().prop('selected', true);
}
DatePickerHandler.prototype.firstElementSelect = function () {
    return $(this.freetestMinute() + ' option').first().prop('selected', true);
}
DatePickerHandler.prototype.timeAndMinuteSelectConfig = function (element) {
    $(element).prop('disabled', true);
    this.nextElementSelect(element);

    if (this.isTimeElement(element) && this.isLastElement(element)) {
        var time = this.freetestTime();
        $(time + ' option:selected').prop('disabled', true);
        $(time + ' option:selected').next().prop('selected', true);

        this.elementUnDisabledIterator([this.freetestMinute()]);
        return this.firstElementSelect();
    }
}
// DatePickerHandler elementHandler methods end

// DatePickerHandler iterating methods end

// DatePickerHandler eventHandler methods
DatePickerHandler.prototype.dateAndTimeChangeHandler = function () {
    var iteratorArray = [this.freetestTime(), this.freetestMinute()];
    return this.elementUnDisabledIterator(iteratorArray,
        this.selectIsToday() ? this.timeAndMinuteIterator : undefined);
}
DatePickerHandler.prototype.freetestTimeController = function () {

    $datepicker = this.datepickerElement();

    if (this.selectedIsBigger()) {
        return this.dateAndTimeChangeHandler();
    }

    var iteratorTargets = [this.freetestMinute()];

    return this.elementUnDisabledIterator(iteratorTargets,
        this.isTodayHours() ? this.timeAndMinuteIterator : undefined);
}
// DatePickerHandler eventHandler methods end