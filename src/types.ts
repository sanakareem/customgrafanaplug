import { DataSourceJsonData } from '@grafana/data';
import { DataQuery } from '@grafana/schema';

export interface MyQuery extends DataQuery {
  /**
   * The Prometheus metric name to query
   * Example: 'test_metric'
   */
  metricName: string;

  /**
   * Label filters as key-value pairs
   * Example: {name: "default"}
   */
  labelFilters?: Record<string, string>;

  /**
   * Constant value for the query
   */
  constant?: number;
}

export const DEFAULT_QUERY: Partial<MyQuery> = {
  metricName: 'test_metric',
  labelFilters: { name: 'default' },
  constant: 0
};

export interface PrometheusSample {
  timestamp: number;
  value: number;
  labels?: Record<string, string>;
}

export interface MyDataSourceOptions extends DataSourceJsonData {
  /**
   * Base URL of your metrics server
   * Example: "http://localhost:3000"
   */
  path: string;

  /**
   * Metrics path (default: '/metrics')
   */
  metricsPath?: string;

  /**
   * Scrape interval in seconds
   */
  scrapeInterval?: number;
}

export interface MySecureJsonData {
  /**
   * API key for authentication
   */
  apiKey?: string;
}
