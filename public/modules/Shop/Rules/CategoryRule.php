<?php

namespace Modules\Shop\Rules;

use Illuminate\Contracts\Validation\Rule;

/**
 * 栏目验证
 * @package Modules\Shop\Rules
 */
class CategoryRule implements Rule
{

    public function __construct()
    {
    }

    public function passes($attribute, $value)
    {
    }

    public function message()
    {
        return 'The validation error message.';
    }
}
