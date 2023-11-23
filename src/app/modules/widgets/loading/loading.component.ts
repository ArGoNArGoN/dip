import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-loading[loading]',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
    @Input() public loading!: boolean | null;
}
