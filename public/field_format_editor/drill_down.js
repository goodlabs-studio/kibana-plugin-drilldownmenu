import React, { Fragment } from 'react';
import {
  EuiFieldText, 
  EuiFormRow, 
  EuiIcon, 
  EuiLink, 
  EuiButton,
  EuiButtonEmpty,
  EuiFlexItem,
  EuiFlexGroup
} from '@elastic/eui';
import { DefaultFormatEditor } from '../../../../src/legacy/ui/public/field_editor/components/field_format_editor/editors/default';
import { LabelTemplateFlyout } from '../../../../src/legacy/ui/public/field_editor/components/field_format_editor/editors/url/label_template_flyout';
import { UrlTemplateFlyout } from '../../../../src/legacy/ui/public/field_editor/components/field_format_editor/editors/url/url_template_flyout';
import { RegistryFieldFormatEditorsProvider } from 'ui/registry/field_format_editors';
import { FormattedMessage } from '@kbn/i18n/react';
import '../../assets/drill_down.css';

export class DrillDownFormatEditor extends DefaultFormatEditor {
	static formatId = "drilldown";

	constructor(props) {
    	super(props);
		this.state = {
			...this.state,
			urlCount: 1,
			showUrlTemplateHelp: false,
			showLabelTemplateHelp: false
	    };
	}

	//once component is rendered, update state
	componentDidMount() {
		const { format, formatParams } = this.props;

		if(formatParams.urlTemplates){
			const currentUrlCount = formatParams.urlTemplates.length;

			if(currentUrlCount > 1){
				this.setState((prevState) => {
					return {
						urlCount: currentUrlCount
					};
				});
			}
		}
	}

	showUrlTemplateHelp = () => {
		this.setState({
			showLabelTemplateHelp: false,
			showUrlTemplateHelp: true,
		});
	};

	hideUrlTemplateHelp = () => {
		this.setState({
			showUrlTemplateHelp: false,
		});
	};

	showLabelTemplateHelp = () => {
		this.setState({
			showLabelTemplateHelp: true,
			showUrlTemplateHelp: false,
		});
	};

	hideLabelTemplateHelp = () => {
		this.setState({
			showLabelTemplateHelp: false,
		});
	};

	incrementUrl = () => {
		this.setState((prevState) => {
			return {
				urlCount: prevState.urlCount + 1
			};
		});
	};

	deleteUrlInput = (id) => {
		const { format, formatParams } = this.props;
		let existingUrlTemplates = [];
		if(formatParams.urlTemplates && id in formatParams.urlTemplates){
			existingUrlTemplates = [
				...formatParams.urlTemplates
			];
			
			existingUrlTemplates.splice(id,1);

			this.onChange({
				urlTemplates: existingUrlTemplates
			});
		}
		this.setState((prevState) => {
			return {
				urlCount: prevState.urlCount - 1
			};
		});     
	};

	getUrlInputValue = (id, type, formatParams) => {
		if((formatParams.urlTemplates) && (id in formatParams.urlTemplates) && (type in formatParams.urlTemplates[id])){
			return formatParams.urlTemplates[id][type];
		}

		return "";
	};

	urlInput = (id, type, value, formatParams) => {
		let existingUrlTemplates = [];
		let existingId = {};
		//If we have existing data for urlTemplates as well as for the exact form ID,
		//we grab that to help with our editing
		if(formatParams.urlTemplates){
			existingUrlTemplates = [
				...formatParams.urlTemplates
			];
			if(id in formatParams.urlTemplates){
				existingId = {
					...formatParams.urlTemplates[id]
				};
			}
		}

		//If we have a valid type we want to save our user input (type is determined in code not by user)
		if(type === "label" || type === "url"){
			existingUrlTemplates[id] = {
				...existingId,
				[type]:value
			};

			this.onChange({
				urlTemplates: [
					...existingUrlTemplates
				]
			});
		}
	};

	displayDeleteButton = (id) => {
		if(this.state.urlCount === 1){
			return (
				<EuiFlexItem grow={false}>
					<EuiButton 
						onClick={() => {this.deleteUrlInput(id)}}
						isDisabled
						size="s"
						fill
						color="danger"
					>
						Remove URL
					</EuiButton>
				</EuiFlexItem>
			);
		}
		return (
			<EuiFlexItem grow={false}>
				<EuiButton 
					onClick={() => {this.deleteUrlInput(id)}}
					size="s"
					fill
					color="danger"
				>
					Remove URL
				</EuiButton>
			</EuiFlexItem>
		);
	};	

	renderUrlInputs = (error, formatParams) => {
		const typeUrl = "url";
		const typeLabel = "label";
		let urlArray = [];

		//The number of url's is kept in our state and used to determine 
		//the amount of components this loop creates
		for(let i = 1; i <= this.state.urlCount; i++){
			urlArray.push(
				<EuiFlexGroup style={{ maxWidth: 600 }} alignItems="center">
					<EuiFlexItem>
						<EuiFormRow
							label={
								<FormattedMessage
									id={`common.ui.fieldEditor.url.urlTemplateLabel.${i}`}
									defaultMessage={`URL template - ${i}`}
								/>
							}
							helpText={
								<EuiLink onClick={this.showUrlTemplateHelp}>
									<FormattedMessage
										id="common.ui.fieldEditor.url.template.helpLinkText"
										defaultMessage="URL template help"
									/>
								</EuiLink>
							}
							key={i}
							isInvalid={!!error}
							error={error}
						>
							<EuiFieldText
								key={i}
								value={this.getUrlInputValue(i, typeUrl, formatParams)}
								onChange={e => {
									this.urlInput(i, typeUrl, e.target.value, formatParams)
								}}
							/>
						</EuiFormRow>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiFormRow
							label={
								<FormattedMessage
									id={`common.ui.fieldEditor.url.urlTemplateName.${i}`}
									defaultMessage={`Label Template - ${i}`}
								/>
							}
							helpText={
								<EuiLink onClick={this.showLabelTemplateHelp}>
									<FormattedMessage
										id="common.ui.fieldEditor.url.labelTemplateHelpText"
										defaultMessage="Label template help"
									/>
								</EuiLink>
							}
							key={i}
							isInvalid={!!error}
							error={error}
						>
							<EuiFieldText
								key={i}
								value={this.getUrlInputValue(i, typeLabel, formatParams)}
								onChange={e => {
									this.urlInput(i,typeLabel, e.target.value, formatParams)
								}}
							/>
						</EuiFormRow>    
					</EuiFlexItem>
					{this.displayDeleteButton(i)}
				</EuiFlexGroup>
			);
		}

		return urlArray;
	};


	render() {
		const { format, formatParams } = this.props;
		const { error, samples } = this.state;
		const defaultPattern = format.getParamDefaults().pattern;

		return (
			<Fragment>
				<LabelTemplateFlyout
					isVisible={this.state.showLabelTemplateHelp}
					onClose={this.hideLabelTemplateHelp}
				/>
				<UrlTemplateFlyout
					isVisible={this.state.showUrlTemplateHelp}
					onClose={this.hideUrlTemplateHelp}
				/>
				<div className="url-input-wrapper">
					{this.renderUrlInputs(error, formatParams)}
				</div>
				<div className="url-button-wrapper">
					<EuiFlexGroup gutterSize="s" alignItems="center">
						<EuiFlexItem grow={false}>
							<EuiButton 
								onClick={this.incrementUrl}
								size="s"
								fill
								color="secondary"
							>
								Add URL
							</EuiButton>
						</EuiFlexItem>
					</EuiFlexGroup>
				</div>
			</Fragment>
		);
	}

}

RegistryFieldFormatEditorsProvider.register(() => DrillDownFormatEditor);