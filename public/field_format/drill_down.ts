import { TextContextTypeConvert, HtmlContextTypeConvert, FIELD_FORMAT_IDS } from '../../../../src/plugins/data/common/field_formats/types';
import { FieldFormat, IFieldFormatMetaParams } from '../../../../src/plugins/data/common/field_formats/field_format';
import { getHighlightHtml } from '../../../../src/plugins/data/common/field_formats/utils';
import {KBN_FIELD_TYPES} from '../../../../src/plugins/data/common/kbn_field_types/types'
import { npSetup, npStart } from 'ui/new_platform';
import { escape, memoize } from 'lodash';
import barGraphIcon from '../../assets/bar_graph.png';
import dashboardIcon from '../../assets/dashboard.png';
import linkIcon from '../../assets/link.png';
import moreIcon from '../../assets/more.png';
import '../../assets/drill_down.css';

const templateMatchRE = /{{([\s\S]+?)}}/g;
const whitelistUrlSchemes = ['http://', 'https://'];

export class DrillFormat extends FieldFormat {
	static id = 'drilldown';
	static title = 'Drill Down';
	static fieldType = [
	    KBN_FIELD_TYPES.NUMBER,
	    KBN_FIELD_TYPES.BOOLEAN,
	    KBN_FIELD_TYPES.DATE,
	    KBN_FIELD_TYPES.IP,
	    KBN_FIELD_TYPES.STRING,
	    KBN_FIELD_TYPES.MURMUR3,
	    KBN_FIELD_TYPES.UNKNOWN,
	    KBN_FIELD_TYPES.CONFLICT,
  	];

  	constructor(params: IFieldFormatMetaParams) {
	    super(params);
	    this.compileTemplate = memoize(this.compileTemplate);
  	}

	private formatLabel(value: string, template: string, url?: string): string {
		if (url == null) url = this.formatUrl(value);
		if (!template) return url;

		return this.compileTemplate(template)({
			value,
			url,
		});
	}

	private formatUrl(value: string, template: string): string {
		if (!template) return value;

		return this.compileTemplate(template)({
			value: encodeURIComponent(value),
			rawValue: value,
		});
	}

	private compileTemplate(template: string): Function {
		const parts = template.split(templateMatchRE).map((part, i) => (i % 2 ? part.trim() : part));

		return function(locals: Record<string, any>): string {
			// replace all the odd bits with their local var
			let output = '';
			let i = -1;
			while (++i < parts.length) {
				if (i % 2) {
					if (locals.hasOwnProperty(parts[i])) {
						const local = locals[parts[i]];
						output += local == null ? '' : local;
					}
				} else {
					output += parts[i];
				}
			}

			return output;
		};
	}

	//htmlConvert is used everywhere applicable, textConvert is used wherever htmlConvert can't be used
	textConvert: TextContextTypeConvert = value => {
		return this.formatLabel(value);
	};

	htmlConvert: HtmlContextTypeConvert = (rawValue, options = {}) => {
		const { field, hit } = options;
		const { parsedUrl } = this._params;
		const { basePath, pathname, origin } = parsedUrl || {};
		const allUrls = this.param('urlTemplates');
		
		let linkElements = '';

		//urlTemplates is an array of the URL's the user has saved under our field formatter
		//this forEach loops through each url saved un urlTemplates, 
		//adds them to a tooltip and return the html
		allUrls.forEach((value, id) => {
			if(value){
				const inputUrl = value.url;
				const inputLabel = value.label;
				const url = escape(this.formatUrl(rawValue, inputUrl));
				const label = escape(this.formatLabel(rawValue, inputLabel, url));
				
				let icon;

				if(url.search('visualize') != -1){
					icon = `${barGraphIcon}`;
				} else if(url.search('dashboard') != -1){
					icon = `${dashboardIcon}`;
				} else {
					icon = `${linkIcon}`;
				}

				const inWhitelist = whitelistUrlSchemes.some(scheme => url.indexOf(scheme) === 0);
				
				if (!inWhitelist && !parsedUrl) {
					return url;
				}

				let prefix = '';

				if (!inWhitelist) {
					// Handles urls like: `#/discover`
					if (url[0] === '#') {
						prefix = `${origin}${pathname}`;
					}
					// Handle urls like: `/app/kibana` or `/xyz/app/kibana`
					else if (url.indexOf(basePath || '/') === 0) {
						prefix = `${origin}`;
					}
					// Handle urls like: `../app/kibana`
					else {
						const prefixEnd = url[0] === '/' ? '' : '/';
						prefix = `${origin}${basePath || ''}/app${prefixEnd}`;
					}
				}

				let linkLabel;

				if (hit && hit.highlight && hit.highlight[field.name]) {
					linkLabel = getHighlightHtml(label, hit.highlight[field.name]);
				} else {
					linkLabel = label;
				}

				const linkTarget = '_blank';

				linkElements = linkElements + `<a href="${prefix}${url}" target="${linkTarget}" class="tooltip-link" rel="noopener noreferrer">
													<img class="tooltip-icon" src="${icon}"/>
													${linkLabel}
												</a>`;
			}
		})

		// return `<div class="hover-element">${rawValue}
		// 			<div class="tooltip-container">
		// 				${linkElements}
		// 			</div>
		// 		</div>`;

		return `<div class="hover-element">${rawValue}
   					<div class="tooltip-container"><img class="tooltip-icon" src="${moreIcon}"/> 
   						<span>Details</span>
					</div>
  					<div class="modal">
	    				<div class="modal-content">
	      					<div class="url-list">
	        					${linkElements}
	      					</div>
	    				</div>
  					</div>
				</div>`
	};

}

//Registering our fieldformatter
npSetup.plugins.data.fieldFormats.register([DrillFormat]);
npStart.plugins.data.fieldFormats.getType([DrillFormat.id]);
