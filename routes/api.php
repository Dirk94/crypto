<?php

Route::post('register', 'AuthController@register')->name('api.register');
Route::post('login', 'AuthController@login')->name('api.login');

Route::group([
    'middleware' => 'auth',
], function() {
    Route::post('portfolios', 'PortfolioController@createPortfolioForUser')->name('api.portfolios.create');
    Route::get('portfolios', 'PortfolioController@listPortfoliosOfUser')->name('api.portfolios.list');
    Route::get('portfolios/{portfolio}', 'PortfolioController@getPortfolioOfUser')->name('api.portfolios.get');
    Route::delete('portfolios/{portfolio}', 'PortfolioController@deletePortfolioOfUser')->name('api.portfolios.delete');

    Route::post('portfolios/{portfolio}/users/{user}', 'PortfolioController@addUserToPortfolio')->name('api.portfolios.users.add');

    Route::get('portfolios/{portfolio}', 'TransactionController@listTransactionsOfPortfolio')->name('api.portfolios.list');
    Route::post('portfolios/{portfolio}/deposit', 'TransactionController@depositToPortfolio')->name('api.portfolios.deposit');
    Route::post('portfolios/{portfolio}/withdraw', 'TransactionController@withdrawFromPortfolio')->name('api.portfolios.withdraw');
    Route::post('portfolios/{portfolio}/trade', 'TransactionController@addTradeToPortfolio')->name('api.portfolios.trade');

    Route::get('portfolios/{portfolio}/history/minutes', 'PortfolioHistoryController@getMinuteHistory')->name('api.portfolios.history.minutes');
    Route::get('portfolios/{portfolio}/history/hours', 'PortfolioHistoryController@getHourHistory')->name('api.portfolios.history.hours');
    Route::get('portfolios/{portfolio}/history/days', 'PortfolioHistoryController@getDayHistory')->name('api.portfolios.history.days');
});
