package plugin

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/data"
)

// DatasourceConfig holds custom settings from JSONData
type DatasourceConfig struct {
	Path string `json:"path"`
}

// Datasource holds the datasource instance with settings
type Datasource struct {
	path string
}

// Make sure Datasource implements required interfaces
var (
	_ backend.QueryDataHandler      = (*Datasource)(nil)
	_ backend.CheckHealthHandler    = (*Datasource)(nil)
	_ instancemgmt.InstanceDisposer = (*Datasource)(nil)
)

// NewDatasource creates a new instance of the datasource
func NewDatasource(_ context.Context, settings backend.DataSourceInstanceSettings) (instancemgmt.Instance, error) {
	config := DatasourceConfig{
		Path: "http://localhost:3001", // default value
	}

	// Unmarshal JSONData to get custom fields
	if settings.JSONData != nil {
		if err := json.Unmarshal(settings.JSONData, &config); err != nil {
			return nil, err
		}
	}

	return &Datasource{
		path: config.Path,
	}, nil
}

// Dispose cleans up resources when the datasource is removed
func (d *Datasource) Dispose() {
	// No cleanup necessary for now
}

// QueryData handles multiple queries
func (d *Datasource) QueryData(ctx context.Context, req *backend.QueryDataRequest) (*backend.QueryDataResponse, error) {
	response := backend.NewQueryDataResponse()

	for _, q := range req.Queries {
		res := d.query(ctx, req.PluginContext, q)
		response.Responses[q.RefID] = res
	}

	return response, nil
}

// query performs the actual metric fetch
func (d *Datasource) query(_ context.Context, _ backend.PluginContext, query backend.DataQuery) backend.DataResponse {
	var response backend.DataResponse

	resp, err := http.Get(d.path + "/metrics")
	if err != nil {
		response.Error = err
		return response
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		response.Error = err
		return response
	}

	// Wrap raw metrics into a frame
	frame := data.NewFrame("metrics")
	frame.Fields = append(frame.Fields,
		data.NewField("raw_metrics", nil, []string{string(body)}),
	)

	response.Frames = append(response.Frames, frame)
	return response
}

// CheckHealth reports the health of the datasource
func (d *Datasource) CheckHealth(_ context.Context, _ *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
	return &backend.CheckHealthResult{
		Status:  backend.HealthStatusOk,
		Message: "Data source is working",
	}, nil
}
