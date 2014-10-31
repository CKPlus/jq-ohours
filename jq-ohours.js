


(function ($) {
	
	$.oHours = function(el, options) {
		var $oHours = $(el);
		$oHours.vars = $.extend({}, $.oHours.defaults, options);
		
		// Store a reference to the slider object
    	//$.data(el, "flexslider", slider);

    	daysMapping = {
        	'0': 'Sun',
        	'1': 'Mon',
        	'2': 'Tue',
        	'3': 'Wed',
        	'4': 'Thurs',
        	'5': 'Fri',
        	'6': 'Sat'
    	}

    	methods = {
	      init: function() {
	      	
	      	var renderTable = function($oHours) {
	      		var tableTmpl = '<table class="table opening-hours-group"><tbody></tbody><input type="hidden" name="ohours" value=""></table>';
	      		$oHours.append(tableTmpl);
	      	}($oHours)

	      	var renderWeekdays = function($oHours){
	      		$oHours.append('<div class="opening-hours-ops"></div>');
	      		$oHours.find('.opening-hours-ops').append('<div class="btn-group weekday-btns" data-toggle="buttons"></div>')
	      		var result = [];
		      	for(var i=0;i<7;i+=1 ){
		      		result.push('<label class="btn btn-primary"><input type="checkbox" name="weekday" value="'+i+'">'+daysMapping[i]+'</label>');
		      	}
		      	$oHours.find('.weekday-btns').append(result.join(''));
	      	}($oHours);


	      	var renderTimeInput = function() {
	      		$oHours.append('<div class="time-input-area"></div>');
	      		$oHours.append('<select id="start-hour" class="opening-hour-input"></select><span>:</span>');
	      		$oHours.append('<select id="start-min" class="opening-hour-input"><span>-</span>');
	      		$oHours.append('<select id="end-hour" class="opening-hour-input"><span>:</span>');
	      		$oHours.append('<select id="end-min" class="opening-hour-input">');

	      		var hoursOptions = function(){
	      			var result = [];
	      			function pad2(number) {
						return (number < 10 ? '0' : '') + number
					}
	      			for(var i=1;i<25;i+=1){
	      				result.push('<option value="'+pad2(i)+'">'+pad2(i)+'</option>');
	      			}
	      			return result.join('')
	      		}()
	      		var minutesOptions = function(){
	      			var result = [],
	      				minutes = ['00', '15', '30', '45'];
	      			
	      			for(var i=0, l=minutes.length;i<l;i+=1){
	      				result.push('<option value="'+minutes[i]+'">'+minutes[i]+'</option>');
	      			}
	      			return result.join('')
	      		}()

	      		$oHours.find('#start-hour').append(hoursOptions);
	      		$oHours.find('#end-hour').append(hoursOptions);
	      		$oHours.find('#start-min').append(minutesOptions);
	      		$oHours.find('#end-min').append(minutesOptions);
	      	}()
	      	
	      	var renderOpPanel = function($oHours){
	      		$oHours.append('<div class="oh-opration"><button type="button" class="btn btn-default" id="add-daytime-btn">Add</button><button type="button" class="btn cancel-btn">Cancel</button></div>');
	      	}($oHours)
	      }
	    }

	    //oHours: Initialize
    	methods.init();
	}



	$.oHours.init = function (callback) {
		alert('s');
      callback();
    };

})(jQuery);


$(function(){
	$.oHours('#ohours');
});

// 	daysMapping = {
//         '0': 'Sun',
//         '1': 'Mon',
//         '2': 'Tue',
//         '3': 'Wed',
//         '4': 'Thurs',
//         '5': 'Fri',
//         '6': 'Sat'
//      }

// $(function(){
// 	var renderOhoursTable = function(ohoursData) {
// 	    var tmpls = ''
// 	    $.each(ohoursData, function(code, hourList){

// 	      var timeLabels = function(hourList){
// 	        var labelTmp = '<div class="label label-info">{{range}}<i class="glyphicon glyphicon-remove remove-datetime"></i></div>&nbsp;',
// 	            retData = []
// 	        for(i=0, l=hourList.length;i<l;i+=1) {
// 	          retData.push(labelTmp.replace('{{range}}', hourList[i].join('-')));
// 	        }
// 	        return retData;
// 	      }(hourList)
// 	      tmpls += '<tr data-index="'+ code +'">'
// 	        + '<td>' + window.daysMapping[code] + '</td>'
// 	        + '<td>' + timeLabels.join('') + '</td>'
// 	        + '<tr>';

// 	    });
// 	    $('.opening-hours-group tbody').html(tmpls);
// 	  }


// 	  var ohoursValue = $('input[name="ohours"]').attr('value'),
// 	      ohoursData = {}
// 	  if(ohoursValue) {
// 	    //ohoursData = JSON.parse(ohoursValue);
// 	    //renderOhoursTable(ohoursData);
// 	  }

// 	    $('#add-daytime-btn').on('click', function () {
// 	    var checked = [];

// 	    $('input[name="day"]:checked').each(function(k,v){
// 	      checked.push($(v).val())
// 	    });

// 	    var day = $('#day-selector option:selected').text(),
// 	        startDay = $('#start-day-selector option:selected').text(),
// 	        startHour = $('#start-hour').val(),
// 	        startMin = $('#start-min').val(),
// 	        endDay = $('#end-day-selector option:selected').text(),
// 	        endHour = $('#end-hour').val(),
// 	        endMin = $('#end-min').val();

// 	    function setDateTime(timeString, date) {
// 	      var result = (date ? new Date(date) : new Date()),
// 	          match = /(\d+):(\d+)/.exec(timeString);
// 	        result.setHours(Number(match[1]), Number(match[2]), 0, 0);
// 	        return result;
// 	    }

// 	    if(setDateTime(startHour+':'+startMin) >= setDateTime(endHour+':'+endMin)){
// 	      alert('Invalid opening hours');
// 	      return;
// 	    }

// 	    for(var i=0, l=checked.length;i<l;i+=1){
// 	      // If weekday no time data just push
// 	      if(!ohoursData[checked[i]]) {
// 	        ohoursData[checked[i]] = [];
// 	        ohoursData[checked[i]].push([startHour + ':' + startMin , endHour + ':' + endMin]);
// 	      }
// 	      // When weekday it has time date must compare start hour
// 	      else {
// 	        var hourList = ohoursData[checked[i]];
// 	        var pushFlag = false;
// 	        for(var j=0, jl=ohoursData[checked[i]].length;j<jl;j+=1){
// 	          var inputStartTime = setDateTime(startHour+':'+startMin),
// 	              inputEndTime = setDateTime(endHour+':'+endMin);

// 	          var itemStartTime = setDateTime(ohoursData[checked[i]][j][0]),
// 	              itemEndTime = setDateTime(ohoursData[checked[i]][j][1]);

// 	          if( (inputStartTime >= itemEndTime)
// 	            || (inputEndTime <= itemStartTime) ){
// 	            pushFlag = true;
// 	          }
// 	          else {
// 	            pushFlag = false;
// 	          }
// 	        }
// 	        if(pushFlag){
// 	          ohoursData[checked[i]].push([startHour + ':' + startMin , endHour + ':' + endMin]);
// 	        }else {
// 	          alert('Repetition opening hours range');
// 	        }
// 	      }
// 	    }

// 	    var uniqHoursData = function(ohoursData) {
// 	      for(code in ohoursData){
// 	        var hourList = ohoursData[code],
// 	            counter = 0,
// 	            tmpObj = {};
// 	        for(i=0,l=hourList.length;i<l;i+=1){
// 	          if( !(hourList[i].join('-') in tmpObj) ) {
// 	            tmpObj[hourList[i].join('-')] = null
// 	          }
// 	          else {
// 	            hourList.splice(i, 1);
// 	            alert('Duplicate opening hours');
// 	          }
// 	        }
// 	      }
// 	      return ohoursData;
// 	    }

// 	    renderOhoursTable(uniqHoursData(ohoursData));

// 	    var $ohInputs = $('input[name="day"]');
// 	    $ohInputs.parent().removeClass('active');
// 	    $ohInputs.attr('checked', false);
// 	  });
	  
// 	   $(document).on('click', '.remove-datetime', function(){
// 	    var $this = $(this),
// 	        removeItemText = $this.parent().text(),
// 	        weekdayCode = $this.parent().parent().parent().attr('data-index');
// 	        ohoursList = ohoursData[weekdayCode];
// 	    for(var i=0,l=ohoursList.length;i<l;i+=1){
// 	      var itemOfList = ohoursList[i];
// 	      if(itemOfList.join('-') == removeItemText) {
// 	        ohoursData[weekdayCode].splice(i, 1); // Remove data model
// 	        if(ohoursData[weekdayCode].length == 0) {
// 	          $this.parent().parent().parent().remove();
// 	          delete ohoursData[weekdayCode];
// 	          break;
// 	        }
// 	        else {
// 	          $this.parent().remove(); // Remove dom
// 	          break;
// 	        }
// 	      }
// 	    }
// 	  });


// 	});