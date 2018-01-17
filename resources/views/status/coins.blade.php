@extends('status.layout')

@section('content')

    <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6" style="margin-top: 25px;">
            <h1>{{ $date }} status</h1>
            <p>
                Number of coins in DB<br>
                <code>{{ $numberOfCoins }}</code>
            </p>
            <p>
                Number of missing values<br>
                <code>{{ count($missingValues) }}</code>
            </p>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Missing timestamp</th>
                    </tr>
                </thead>
                <tbody>
                @foreach($missingValues as $value)
                    <tr>
                        <td>
                            <code style="margin-right: 8px;">{{ $value }}</code>
                            {{ \Carbon\Carbon::parse($value)->diffForHumans() }}
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>


@endsection