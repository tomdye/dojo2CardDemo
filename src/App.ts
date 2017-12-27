import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import CardGrid from './widgets/CardGrid';

import * as css from './styles/app.m.css';

export class App extends WidgetBase {

	protected render() {
		return v('div', { classes: css.root }, [
			v('div', { classes: css.top }),
			v('div', { classes: css.gridHolder }, [
				w(CardGrid, {})
			])
		]);
	}
}

export default App;
