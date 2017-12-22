import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Dimensions from '@dojo/widget-core/meta/Dimensions'
import WebAnimation from '@dojo/widget-core/meta/WebAnimation';

import * as css from './styles/card.m.css';
import * as shadowCss from './styles/shadow.m.css';

export class Card extends WidgetBase {
	private _expanded = false;
	private _play = false;
	private _animate = false;

	private _onClick(e: MouseEvent) {
		this._expanded = !this._expanded;
		this._animate = true;
		this._play = true;
		this.invalidate();
	}

	protected _onAnimationEnd() {
		this._play = false;
		this._animate = this._expanded;
		this.invalidate();
	}

	protected render() {
		const dimensions = this.meta(Dimensions);
		const { position, size } = dimensions.get('root');

		if (this._animate) {
			const effects = [
				{ left: `${position.left}px`, top: `${position.top}px`, width: `${size.width}px`, height: `${size.height}px` },
				{ left: '0px', top: '0px', width: '100%', height: '100%' }
			];

			const controls = {
				play: this._play,
				onFinish: this._onAnimationEnd,
			};

			const timing = {
				duration: 200,
				easing: 'cubic-bezier(0, 0, 0.3, 1)',
				fill: 'forwards'
			};

			const expandAnimation = {
				id: 'expandAnimation',
				effects,
				controls,
				timing
			};

			const contractAnimation = {
				id: 'contractAnimation',
				effects,
				controls,
				timing: {
					...timing,
					direction: 'reverse'
				}
			};

			this.meta(WebAnimation).animate('card', this._expanded ? expandAnimation as any : contractAnimation);
		}

		return v('div', {
			key: 'root',
			classes: css.root
		}, [
			v('div', {
				key: 'card',
				onclick: this._onClick,
				classes: [ css.card, shadowCss.depth2, this._animate ? css.expanded : null ]
			}, [
				v('div', { classes: css.title }, [
					v('h2', { classes: css.titleText }, [ 'TITLE' ])
				]),
				v('div', { classes: [ css.content, css.paddedContent ] }, this.children)
			])
		]);
	}
}

export default Card;
