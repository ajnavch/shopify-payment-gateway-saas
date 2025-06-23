import { useEffect, useState } from "react";
import { AppProvider, Page, Layout, Card, DataTable, Button, Spinner } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

export default function AdminHome() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/accounts/list")
      .then((r) => r.json())
      .then((d) => setAccounts(d.accounts || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppProvider i18n={{}}>
      <Page title="PayPal Accounts Manager">
        <Layout>
          <Layout.Section>
            <Card title="PayPal Accounts" actions={[{ content: "Add Account" }]}>
              {loading ? <Spinner /> : (
                <DataTable
                  columnContentTypes={["text", "numeric", "numeric", "text"]}
                  headings={["Client ID", "Quota", "Today Used", "Status"]}
                  rows={accounts.map(acc => [
                    acc.clientId,
                    acc.quota,
                    acc.todayReceived,
                    acc.status,
                  ])}
                />
              )}
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}