import { gql } from '@apollo/client';

export const GET_CHART_DATA = gql`
  query getChartData{
        chartData {
            label,
            points
        }
    }
`;

export const CHART_DATA_UPDATED = gql`
  subscription {
    updatedData {
            id
            label
            points
        }
    }
`;

export const GET_CHART_DATA_PAGED = gql`
  query chartDataPaged($page: Int!, $pageSize: Int!) {
    chartDataPaged(page: $page, pageSize: $pageSize) {
      data {
        id
        label
        points
      }
      currentPage
      totalPages
    }
  }
`;