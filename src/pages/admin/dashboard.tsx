import { useEffect, useState } from "react";
import { AppProvider, Page, Layout, Card, DataTable, Text } from "@shopify/polaris";
export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch("/api/dashboard/revenue?storeId=demo-store-id")
      .then(r => r.json())
      .then(setData);
  }, []);
  return (
    <AppProvider i18n={{}}>
      <Page title="Revenue Dashboard">
        <Layout>
          <Layout.Section>
            <Card title="Tổng doanh thu" sectioned>
              <Text variant="headingLg">{data?.totalRevenue?.toLocaleString() || "..."}</Text>
            </Card>
            <Card title="PayPal Quota Usage" sectioned>
              <DataTable
                columnContentTypes={["text", "numeric", "numeric", "text"]}
                headings={["Client ID", "Quota", "Đã dùng", "Status"]}
                rows={data?.accounts?.map(acc => [
                  acc.clientId, acc.quota, acc.todayReceived, acc.status
                ]) || []}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}