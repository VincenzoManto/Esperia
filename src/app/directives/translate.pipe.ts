import { Pipe, PipeTransform } from "@angular/core";
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

@Pipe({
  name: 'translateX',
  pure: false
})
export class TranslateXPipe extends TranslatePipe {

  override transform(query: string, ...args: any[]) {
    return super.transform(query, ...args)?.replace(/([A-Z])/g, ' $1').trim();
  }

}
