import React from 'react';
import { EuiBasicTable, EuiCode, EuiFlyout, EuiFlyoutBody, EuiText } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';
import barGraphIcon from '../../assets/bar_graph.png';
import dashboardIcon from '../../assets/dashboard.png';
import linkIcon from '../../assets/link.png';

export const UrlTemplateFlyout = ({ isVisible = false, onClose = () => {} }) => {
  return isVisible ? (
    <EuiFlyout onClose={onClose}>
      <EuiFlyoutBody>
        <EuiText>
          <h3>
            <FormattedMessage
              id="common.ui.fieldEditor.urlTemplateHeader"
              defaultMessage="Url Template"
            />
          </h3>
          <p>
            <FormattedMessage
              id="common.ui.fieldEditor.urlTemplateLabel.fieldDetail"
              defaultMessage="If a field only contains part of a URL then a {strongUrlTemplate} can be used to format the value as
              a complete URL. The format is a string which uses double curly brace notation {doubleCurlyBraces} to inject values.
              The following values can be accessed within the curly braces:"
              values={{
                doubleCurlyBraces: <EuiCode>{'{{ }}'}</EuiCode>,
                strongUrlTemplate: (
                  <strong>
                    <FormattedMessage
                      id="common.ui.fieldEditor.urlTemplateLabel.strongUrlTemplateLabel"
                      defaultMessage="Url Template"
                    />
                  </strong>
                ),
              }}
            />
          </p>
          <ul>
            <li>
              <EuiCode>value</EuiCode> &mdash;&nbsp;
              <FormattedMessage
                id="common.ui.fieldEditor.urlTemplate.valueLabel"
                defaultMessage="The URI-escaped value"
              />
            </li>
            <li>
              <EuiCode>rawValue</EuiCode> &mdash;&nbsp;
              <FormattedMessage
                id="common.ui.fieldEditor.urlTemplate.rawValueLabel"
                defaultMessage="The unescaped value"
              />
            </li>
          </ul>
          <h4>
            <FormattedMessage
              id="common.ui.fieldEditor.urlTemplate.examplesHeader"
              defaultMessage="Examples"
            />
          </h4>
          <EuiBasicTable
            items={[
              {
                input: 1234,
                template: 'http://company.net/profiles?user_id={{value}}',
                output: 'http://company.net/profiles?user_id=1234',
              },
              {
                input: 'users/admin',
                template: 'http://company.net/groups?id={{value}}',
                output: 'http://company.net/groups?id=users%2Fadmin',
              },
              {
                input: '/images/favicon.ico',
                template: 'http://www.site.com{{rawValue}}',
                output: 'http://www.site.com/images/favicon.ico',
              },
            ]}
            columns={[
              {
                field: 'input',
                name: i18n.translate('common.ui.fieldEditor.urlTemplate.inputHeader', {
                  defaultMessage: 'Input',
                }),
                width: '160px',
              },
              {
                field: 'template',
                name: i18n.translate('common.ui.fieldEditor.urlTemplate.templateHeader', {
                  defaultMessage: 'Template',
                }),
              },
              {
                field: 'output',
                name: i18n.translate('common.ui.fieldEditor.urlTemplate.outputHeader', {
                  defaultMessage: 'Output',
                }),
              },
            ]}
          />
          <br/>
          <h4>
            <FormattedMessage
              id="common.ui.fieldEditor.urlTemplateLabel.iconDetail"
              defaultMessage="Drill-Down icons are determined by the URL Template used:"
            />
          </h4>
          <EuiBasicTable
            items={[
              {
                url: "Dashboard URL",
                example: "http://site.com/app/kibana#/dashboard/...",
                icon: `<img class="flyout-image" src="${dashboardIcon}"/>`,
              },
              {
                url: "Visualization URL",
                example: "http://site.com/app/kibana#/visualize/...",
                icon: `<img class="flyout-image" src="${barGraphIcon}"/>`,
              },
              {
                url: "Others",
                example: "http://othersite.com/...",
                icon: `<img class="flyout-image" src="${linkIcon}"/>`,
              },
            ]}
            columns={[
              {
                field: 'url',
                name: i18n.translate('common.ui.fieldEditor.urlTemplate.urlType', {
                  defaultMessage: 'URL Type',
                }),
                width: '160px',
              },
              {
                field: 'example',
                name: i18n.translate('common.ui.fieldEditor.urlTemplate.example', {
                  defaultMessage: 'Example',
                }),
              },
              {
                field: 'icon',
                name: i18n.translate('common.ui.fieldEditor.urlTemplate.icon', {
                  defaultMessage: 'Icon',
                }),
                render: value => {
                  return (
                    <span
                      /*
                       * Justification for dangerouslySetInnerHTML:
                       * Example output produces image element to represent icons.
                       */
                      dangerouslySetInnerHTML={{ __html: value }} //eslint-disable-line react/no-danger
                    />
                  );
                },
              },
            ]}
          />
        </EuiText>
      </EuiFlyoutBody>
    </EuiFlyout>
  ) : null;
};