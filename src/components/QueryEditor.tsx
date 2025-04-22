import React, { ChangeEvent } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import type { DataSource } from 'datasource';
import { MyDataSourceOptions, MyQuery } from 'types';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export function QueryEditor({ query, onChange, onRunQuery }: Props) {
  const onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, metricName: event.target.value });
  };

  const onConstantChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, constant: parseInt(event.target.value, 10) });
    // Only execute the query when the constant changes
    onRunQuery();
  };

  const { metricName, constant } = query;

  return (
    <div className="gf-form">
      <InlineField label="Query Text" labelWidth={16} tooltip="Enter the metric name to query">
        <Input
          width={32}
          value={metricName || ''}
          onChange={onQueryTextChange}
          placeholder="Metric name"
          aria-label="Query Text"
        />
      </InlineField>
      <InlineField label="Constant" labelWidth={16} tooltip="Constant value">
        <Input
          width={32}
          type="number"
          value={constant || 0}
          onChange={onConstantChange}
          placeholder="Constant value"
          aria-label="Constant"
        />
      </InlineField>
    </div>
  );
}