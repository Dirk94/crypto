<?php

Route::post('register', 'AuthController@register')->name('api.register');
Route::post('login', 'AuthController@login')->name('api.login');

Route::group([
    'middleware' => 'auth',
], function() {

    Route::get('/coins', 'SearchController@searchCoin')->name('api.coins.search');

    //
    // General Portfolio Stuff
    //
    Route::post  ('portfolios', 'PortfolioController@createPortfolioForUser')->name('api.portfolios.create');
    Route::get   ('portfolios', 'PortfolioController@listPortfoliosOfUser')->name('api.portfolios.list');
    Route::get   ('portfolios/{portfolio}', 'PortfolioController@getPortfolioOfUser')->name('api.portfolios.get');
    Route::delete('portfolios/{portfolio}', 'PortfolioController@deletePortfolioOfUser')->name('api.portfolios.delete');

    Route::post('portfolios/{portfolio}/users/{user}', 'PortfolioController@addUserToPortfolio')->name('api.portfolios.users.add');

    //
    // Portfolio Transactions
    //
    Route::get ('portfolios/{portfolio}/transactions', 'TransactionController@listTransactionsOfPortfolio')->name('api.portfolios.list');
    Route::post('portfolios/{portfolio}/transactions', 'TransactionController@createTransaction')->name('api.portfolios.create');

    Route::get   ('portfolios/{portfolio}/transactions/{transaction}', 'TransactionController@getSingleTransaction')->name('api.portfolios.transactions.get');
    Route::delete('portfolios/{portfolio}/transactions/{transaction}', 'TransactionController@deleteTransaction')->name('api.portfolios.transactions.delete');
    Route::put   ('portfolios/{portfolio}/transactions/{transaction}', 'TransactionController@updateTransaction')->name('api.portfolios.transactions.update');

    //
    // Portfolio History
    //
    Route::get('portfolios/{portfolio}/history/minutes', 'PortfolioHistoryController@getMinuteHistory')->name('api.portfolios.history.minutes');
    Route::get('portfolios/{portfolio}/history/hours', 'PortfolioHistoryController@getHourHistory')->name('api.portfolios.history.hours');
    Route::get('portfolios/{portfolio}/history/days', 'PortfolioHistoryController@getDayHistory')->name('api.portfolios.history.days');
    Route::get('portfolios/{portfolio}/history/recalculate', 'PortfolioHistoryController@recalculatePortfolioHistory')->name('api.portfolios.history.recalculate');
});
