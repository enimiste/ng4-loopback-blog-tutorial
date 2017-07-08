import {
    AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output,
    SimpleChanges
} from '@angular/core';
import {Config} from "../config";

@Component({
    selector: 'app-tinymce-editor',
    styleUrls: ['./tinymce-editor.component.css'],
    template: `<textarea id="{{elementId}}"></textarea>`
})
export class TinymceEditorComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Input() elementId: string;
    @Input() value: string;
    @Output() onEditorKeyup: EventEmitter<string> = new EventEmitter<string>();

    editor: any;

    constructor() {
    }

    ngAfterViewInit(): void {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['link', 'paste', 'table'],
            skin_url: Config.baseUrl + 'assets/skins/lightgray',
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.onEditorKeyup.emit(content);
                });
            },
        });
    }

    ngOnDestroy(): void {
        tinymce.remove(this.editor);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.editor)
            this.editor.setContent(this.value);
    }

}
