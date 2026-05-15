<?php

namespace App\Http\Enums;

enum Roles: int
{
    case ADMIN = 1;
    case TEACHER = 2;
    case STUDENT = 3;
}