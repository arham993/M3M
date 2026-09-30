/**
 * Icons from Phosphor (official SVG files in @phosphor-icons/core), one weight each.
 * Importing single SVGs keeps the bundle ~90 KB smaller than the full React icon package.
 */
import { createElement } from 'react';

import TrendUpSvg from '@phosphor-icons/core/assets/regular/trend-up.svg?raw';
import CoinsSvg from '@phosphor-icons/core/assets/regular/coins.svg?raw';
import EyeSvg from '@phosphor-icons/core/assets/regular/eye.svg?raw';
import PathSvg from '@phosphor-icons/core/assets/regular/path.svg?raw';
import BuildingsSvg from '@phosphor-icons/core/assets/regular/buildings.svg?raw';
import TShirtSvg from '@phosphor-icons/core/assets/regular/t-shirt.svg?raw';
import DiamondSvg from '@phosphor-icons/core/assets/regular/diamond.svg?raw';
import ForkKnifeSvg from '@phosphor-icons/core/assets/regular/fork-knife.svg?raw';
import CoffeeSvg from '@phosphor-icons/core/assets/regular/coffee.svg?raw';
import FilmStripSvg from '@phosphor-icons/core/assets/regular/film-strip.svg?raw';
import ChampagneSvg from '@phosphor-icons/core/assets/regular/champagne.svg?raw';
import BowlFoodSvg from '@phosphor-icons/core/assets/regular/bowl-food.svg?raw';
import FlowerLotusSvg from '@phosphor-icons/core/assets/regular/flower-lotus.svg?raw';
import CarSvg from '@phosphor-icons/core/assets/regular/car.svg?raw';
import DropSvg from '@phosphor-icons/core/assets/regular/drop.svg?raw';
import PhoneCallSvg from '@phosphor-icons/core/assets/regular/phone-call.svg?raw';
import DownloadSimpleSvg from '@phosphor-icons/core/assets/regular/download-simple.svg?raw';
import SquaresFourSvg from '@phosphor-icons/core/assets/regular/squares-four.svg?raw';
import ImagesSvg from '@phosphor-icons/core/assets/regular/images.svg?raw';
import CaretLeftSvg from '@phosphor-icons/core/assets/regular/caret-left.svg?raw';
import CaretRightSvg from '@phosphor-icons/core/assets/regular/caret-right.svg?raw';
import XSvg from '@phosphor-icons/core/assets/regular/x.svg?raw';
import PaperPlaneTiltSvg from '@phosphor-icons/core/assets/regular/paper-plane-tilt.svg?raw';
import PhoneSvg from '@phosphor-icons/core/assets/regular/phone.svg?raw';
import PhoneFillSvg from '@phosphor-icons/core/assets/fill/phone-fill.svg?raw';
import SealCheckSvg from '@phosphor-icons/core/assets/regular/seal-check.svg?raw';
import SealCheckFillSvg from '@phosphor-icons/core/assets/fill/seal-check-fill.svg?raw';
import CheckCircleSvg from '@phosphor-icons/core/assets/regular/check-circle.svg?raw';
import CheckCircleFillSvg from '@phosphor-icons/core/assets/fill/check-circle-fill.svg?raw';
import WhatsappLogoSvg from '@phosphor-icons/core/assets/regular/whatsapp-logo.svg?raw';
import WhatsappLogoFillSvg from '@phosphor-icons/core/assets/fill/whatsapp-logo-fill.svg?raw';

const inner = (svg) => svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

function make(name, regular, filled) {
  const paths = { regular: inner(regular), fill: filled ? inner(filled) : inner(regular) };
  const Icon = ({ weight = 'regular', size = '1em', ...rest }) => createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 256 256', fill: 'currentColor', width: size, height: size,
    focusable: 'false', ...rest, dangerouslySetInnerHTML: { __html: paths[weight] || paths.regular },
  });
  Icon.displayName = name;
  return Icon;
}

export const TrendUp = make('TrendUp', TrendUpSvg);
export const Coins = make('Coins', CoinsSvg);
export const Eye = make('Eye', EyeSvg);
export const Path = make('Path', PathSvg);
export const Buildings = make('Buildings', BuildingsSvg);
export const TShirt = make('TShirt', TShirtSvg);
export const Diamond = make('Diamond', DiamondSvg);
export const ForkKnife = make('ForkKnife', ForkKnifeSvg);
export const Coffee = make('Coffee', CoffeeSvg);
export const FilmStrip = make('FilmStrip', FilmStripSvg);
export const Champagne = make('Champagne', ChampagneSvg);
export const BowlFood = make('BowlFood', BowlFoodSvg);
export const FlowerLotus = make('FlowerLotus', FlowerLotusSvg);
export const Car = make('Car', CarSvg);
export const Drop = make('Drop', DropSvg);
export const PhoneCall = make('PhoneCall', PhoneCallSvg);
export const DownloadSimple = make('DownloadSimple', DownloadSimpleSvg);
export const SquaresFour = make('SquaresFour', SquaresFourSvg);
export const Images = make('Images', ImagesSvg);
export const CaretLeft = make('CaretLeft', CaretLeftSvg);
export const CaretRight = make('CaretRight', CaretRightSvg);
export const X = make('X', XSvg);
export const Phone = make('Phone', PhoneSvg, PhoneFillSvg);
export const PaperPlaneTilt = make('PaperPlaneTilt', PaperPlaneTiltSvg);
export const SealCheck = make('SealCheck', SealCheckSvg, SealCheckFillSvg);
export const CheckCircle = make('CheckCircle', CheckCircleSvg, CheckCircleFillSvg);
export const WhatsappLogo = make('WhatsappLogo', WhatsappLogoSvg, WhatsappLogoFillSvg);
