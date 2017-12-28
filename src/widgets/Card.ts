import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Dimensions from '@dojo/widget-core/meta/Dimensions'
import WebAnimation, { AnimationProperties, AnimationTimingProperties } from '@dojo/widget-core/meta/WebAnimation';

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

	protected _getAnimation(first: any): AnimationProperties {
		const last = this.meta(Dimensions).get('card');

		const invert = {
			x: first.position.left - last.position.left,
			y: first.position.top - last.position.top,
			sx: first.size.width / last.size.width,
			sy: first.size.height / last.size.height
		}

		const effects = [
			{ transform: `translate(${invert.x}px, ${invert.y}px)
						  scale(${invert.sx}, ${invert.sy})` },
			{ transform: 'translate(0) scale(1)' }
		];

		const controls = {
			play: this._play,
			onFinish: this._onAnimationEnd,
		};

		const timing: AnimationTimingProperties = {
			duration: 200,
			easing: 'cubic-bezier(0, 0, 0.3, 1)',
			fill: 'forwards'
		};

		const expandAnimation: AnimationProperties = {
			id: 'expandAnimation',
			effects,
			controls,
			timing
		};

		const contractAnimation: AnimationProperties = {
			id: 'contractAnimation',
			effects,
			controls,
			timing: {
				...timing,
				direction: 'reverse'
			}
		};

		return this._expanded ? expandAnimation : contractAnimation;
	}

	protected render() {
		return v('div', {
			key: 'root',
			classes: css.root
		}, [
			v('div', (inserted, deferred) => {
				const prepareAnimation = deferred && this._animate;
				if (prepareAnimation) {
					const first = this.meta(Dimensions).get('card');

					this.meta(WebAnimation).animate('card', () => {
						return this._getAnimation(first);
					});
				}

				return {
					key: 'card',
					onclick: this._onClick,
					classes: [ css.card, shadowCss.depth2, prepareAnimation ? css.expanded : null ]
				};
			}, [
				v('div', { classes: css.title }, [
					v('h2', { classes: css.titleText }, [ 'CLICK ME' ])
				]),
				v('div', { classes: [ css.content, css.paddedContent ] }, this.children)
			])
		]);
	}
}

export default Card;
