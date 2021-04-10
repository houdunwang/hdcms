<div class="text-center pb-16">
    @if (site()['setting']['base']['copyright']??'')
    <div>{!! site()['setting']['base']['copyright'] !!}</div>
    @endif
    <div>
        @if (site()['setting']['base']['tel']??'')
        <span class="pr-2"> <i class="fas fa-phone-square-alt"></i> {{ site()['setting']['base']['tel'] }} </span>
        @endif
        @if (site()['setting']['base']['email']??'')
        <span class="pr-2"><i class="fas fa-envelope"></i> {{ site()['setting']['base']['email'] }}</span>
        @endif
    </div>
    @if (site()['setting']['base']['icp']??'')
    <a href="https://beian.miit.gov.cn/" target="_blank">
        ICP证: {{ site()['setting']['base']['icp'] }}
    </a>
    @endif
</div>
