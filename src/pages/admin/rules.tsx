import { useEffect, useState } from "react";
import { AppProvider, Page, Card, Layout, DataTable, Button } from "@shopify/polaris";
export default function RulesPage() {
  const [rules, setRules] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/rules/list?storeId=demo-store-id").then(r => r.json()).then(d => setRules(d.rules || []));
  }, []);
  return (
    <AppProvider i18n={{}}>
      <Page title="Tax/Shipping/Insurance Rules">
        <Layout>
          <Layout.Section>
            <Card title="Rules" actions={[{ content: "Add Rule" }]}>
              <DataTable
                columnContentTypes={["text", "text", "text"]}
                headings={["Type", "Country", "Formula"]}
                rows={rules.map(r => [r.type, r.country || "All", r.formula])}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}