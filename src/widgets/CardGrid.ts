import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Card from './Card';

import * as css from './styles/cardGrid.m.css';

export class CardGrid extends WidgetBase {

	protected render() {
		return v('div', { classes: css.root }, [
			v('header', { classes: css.title }, [ 'Title' ]),
			v('div', { classes: css.grid }, [
				v('div', { classes: css.row }, [
					w(Card, {}, [ 'Lorem ipsum dolor sit amet' ]),
					w(Card, {}, [ 'Lorem ipsum dolor sit amet' ]),
					w(Card, {}, [ 'Lorem ipsum dolor sit amet' ])
				]),
				v('div', { classes: css.row }, [
					w(Card, {}, [ 'Lorem ipsum dolor sit amet' ]),
					w(Card, {}, [ 'Lorem ipsum dolor sit amet' ]),
					w(Card, {}, [ 'Lorem ipsum dolor sit amet' ])
				])
			])
		]);
	}
}

export default CardGrid;
