<?php

Route::get('status/history/minutes', 'HistoryStatusController@showMinuteHistoryStatus')->name('history.status.minutes');
Route::get('status/history/hours', 'HistoryStatusController@showHourHistoryStatus')->name('history.status.hours');
Route::get('status/history/days', 'HistoryStatusController@showDayHistoryStatus')->name('history.status.days');

Route::get('/', function() {
    return view('react');
});

Route::get('{catchall}', function() {
    return view('react');
})->where('catchall', '(.*)');
