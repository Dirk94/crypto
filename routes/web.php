<?php

Route::get('/', function() {
    return view('react');
});

Route::get('{catchall}', function() {
    return view('react');
})->where('catchall', '(.*)');
