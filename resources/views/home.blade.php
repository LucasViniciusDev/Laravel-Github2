@extends('layout.app')

@section('body')

<div class="row bg-grey">
    <div class="col-12" style="min-height: 100vh;">
    @include('users')
    @include('repositories')
    </div>
</div>

@include('components.modals')

@endsection
