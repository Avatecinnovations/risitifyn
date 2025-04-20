import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  container: {
    maxWidth: 800,
    margin: "0 auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logo: {
    height: 40,
    marginBottom: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  quoteNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "right",
  },
  dates: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: 1,
    borderColor: "#E5E7EB",
    paddingBottom: 16,
    marginBottom: 16,
  },
  date: {
    fontSize: 10,
    color: "#666",
  },
  project: {
    marginBottom: 16,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: "semibold",
    marginBottom: 6,
  },
  projectContent: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 4,
  },
  projectDetails: {
    marginTop: 6,
  },
  projectDetail: {
    fontSize: 9,
    color: "#666",
    marginBottom: 3,
  },
  fromTo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  fromToSection: {
    width: "48%",
  },
  fromToTitle: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "medium",
    marginBottom: 6,
  },
  fromToName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  fromToText: {
    fontSize: 9,
    color: "#666",
    marginBottom: 3,
  },
  table: {
    marginTop: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableHeaderCell: {
    fontSize: 9,
    color: "#666",
    textTransform: "uppercase",
    fontWeight: "medium",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableCell: {
    fontSize: 9,
    color: "#111827",
  },
  tableFooter: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  notes: {
    marginTop: 20,
    borderTop: 1,
    borderColor: "#E5E7EB",
    paddingTop: 16,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: "semibold",
    marginBottom: 6,
  },
  notesText: {
    fontSize: 9,
    color: "#666",
  },
  footer: {
    marginTop: 30,
    borderTop: 1,
    borderColor: "#E5E7EB",
    paddingTop: 20,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  footerText: {
    fontSize: 9,
    color: "#666",
  },
  footerLink: {
    color: "#2563EB",
  },
});

interface QuotePDFProps {
  quote: {
    id: string;
    quote_number: string;
    issue_date: string;
    expiry_date: string;
    status: string;
    total_amount: number;
    tax_amount: number;
    tax_rate: number;
    notes?: string;
    terms?: string;
    payment_terms?: string;
    currency: string;
    quote_items: Array<{
      id: string;
      description: string;
      quantity: number;
      unit_price: number;
      amount: number;
    }>;
    client?: {
      id: string;
      name: string;
      email: string;
      address?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
      phone?: string;
    };
    project?: {
      id: string;
      name: string;
      description?: string;
      start_date?: string;
      end_date?: string;
    };
    user?: {
      user_metadata?: {
        businessName?: string;
        address?: string;
        phone?: string;
        email?: string;
        website?: string;
        logo_url?: string;
      };
    };
  };
}

const formatCurrency = (amount: number, currency: string = "USD"): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    console.error("Currency formatting error:", error);
    return `$${amount.toFixed(2)}`;
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const QuotePDF: React.FC<QuotePDFProps> = ({ quote }) => {
  const subtotal = quote.quote_items.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const tax = quote.tax_amount || 0;
  const total = quote.total_amount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              {quote.user?.user_metadata?.logo_url ? (
                <Image
                  src={quote.user.user_metadata.logo_url}
                  style={styles.logo}
                />
              ) : (
                <Text style={styles.companyName}>
                  {quote.user?.user_metadata?.businessName || "Company Name"}
                </Text>
              )}
            </View>
            <View>
              <Text style={styles.quoteNumber}>
                Quote #{quote.quote_number}
              </Text>
            </View>
          </View>

          {/* Dates */}
          <View style={styles.dates}>
            <View>
              <Text style={styles.date}>Issue Date</Text>
              <Text style={styles.date}>{formatDate(quote.issue_date)}</Text>
            </View>
            <View>
              <Text style={styles.date}>Expiry Date</Text>
              <Text style={styles.date}>{formatDate(quote.expiry_date)}</Text>
            </View>
          </View>

          {/* Project Section */}
          {quote.project && (
            <View style={styles.project}>
              <Text style={styles.projectTitle}>Project</Text>
              <View style={styles.projectContent}>
                <View style={styles.projectDetails}>
                  <Text style={styles.projectDetail}>
                    <Text style={{ fontWeight: "medium" }}>Project Name: </Text>
                    {quote.project.name}
                  </Text>
                  {quote.project.description && (
                    <Text style={styles.projectDetail}>
                      <Text style={{ fontWeight: "medium" }}>
                        Description:{" "}
                      </Text>
                      {quote.project.description}
                    </Text>
                  )}
                  {quote.project.start_date && (
                    <Text style={styles.projectDetail}>
                      <Text style={{ fontWeight: "medium" }}>Start Date: </Text>
                      {formatDate(quote.project.start_date)}
                    </Text>
                  )}
                  {quote.project.end_date && (
                    <Text style={styles.projectDetail}>
                      <Text style={{ fontWeight: "medium" }}>End Date: </Text>
                      {formatDate(quote.project.end_date)}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}

          {/* From/To Section */}
          <View style={styles.fromTo}>
            <View style={styles.fromToSection}>
              <Text style={styles.fromToTitle}>FROM:</Text>
              <Text style={styles.fromToName}>
                {quote.user?.user_metadata?.businessName || "Company Name"}
              </Text>
              <Text style={styles.fromToText}>
                {quote.user?.user_metadata?.address || "Address"}
              </Text>
              <Text style={styles.fromToText}>
                {quote.user?.user_metadata?.phone || "Phone"}
              </Text>
              <Text style={styles.fromToText}>
                {quote.user?.user_metadata?.email || "Email"}
              </Text>
            </View>
            <View style={styles.fromToSection}>
              <Text style={styles.fromToTitle}>TO:</Text>
              <Text style={styles.fromToName}>
                {quote.client?.name || "N/A"}
              </Text>
              <Text style={styles.fromToText}>
                {quote.client?.address || "N/A"}
              </Text>
              <Text style={styles.fromToText}>
                {[
                  quote.client?.city,
                  quote.client?.state,
                  quote.client?.postal_code,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </Text>
              <Text style={styles.fromToText}>
                {quote.client?.country || ""}
              </Text>
              <Text style={styles.fromToText}>
                Phone: {quote.client?.phone || "N/A"}
              </Text>
              <Text style={styles.fromToText}>
                Email: {quote.client?.email || "N/A"}
              </Text>
            </View>
          </View>

          {/* Quote Items Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { width: "45%" }]}>
                Description
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  { width: "15%", textAlign: "right" },
                ]}
              >
                Quantity
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  { width: "20%", textAlign: "right" },
                ]}
              >
                Unit Price
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  { width: "20%", textAlign: "right" },
                ]}
              >
                Amount
              </Text>
            </View>
            {quote.quote_items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: "45%" }]}>
                  {item.description}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "15%", textAlign: "right" },
                  ]}
                >
                  {item.quantity}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "20%", textAlign: "right" },
                  ]}
                >
                  {formatCurrency(item.unit_price, quote.currency)}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "20%", textAlign: "right" },
                  ]}
                >
                  {formatCurrency(item.amount, quote.currency)}
                </Text>
              </View>
            ))}
            <View style={styles.tableFooter}>
              <Text
                style={[styles.tableCell, { width: "80%", textAlign: "right" }]}
              >
                Subtotal
              </Text>
              <Text
                style={[styles.tableCell, { width: "20%", textAlign: "right" }]}
              >
                {formatCurrency(subtotal, quote.currency)}
              </Text>
            </View>
            <View style={styles.tableFooter}>
              <Text
                style={[styles.tableCell, { width: "80%", textAlign: "right" }]}
              >
                Tax ({quote.tax_rate || 0}%)
              </Text>
              <Text
                style={[styles.tableCell, { width: "20%", textAlign: "right" }]}
              >
                {formatCurrency(tax, quote.currency)}
              </Text>
            </View>
            <View style={styles.tableFooter}>
              <Text
                style={[
                  styles.tableCell,
                  { width: "80%", textAlign: "right", fontWeight: "bold" },
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "20%", textAlign: "right", fontWeight: "bold" },
                ]}
              >
                {formatCurrency(total, quote.currency)}
              </Text>
            </View>
          </View>

          {/* Notes and Terms */}
          {(quote.notes || quote.terms) && (
            <View style={styles.notes}>
              {quote.notes && (
                <View style={{ marginBottom: 16 }}>
                  <Text style={styles.notesTitle}>Notes</Text>
                  <Text style={styles.notesText}>{quote.notes}</Text>
                </View>
              )}
              {quote.terms && (
                <View>
                  <Text style={styles.notesTitle}>Terms</Text>
                  <Text style={styles.notesText}>{quote.terms}</Text>
                </View>
              )}
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Thank you!</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", gap: 16 }}>
                <Text style={styles.footerText}>
                  {quote.user?.user_metadata?.phone || "Phone"}
                </Text>
                <Text style={styles.footerText}>
                  {quote.user?.user_metadata?.address || "Address"}
                </Text>
              </View>
              {quote.user?.user_metadata?.website && (
                <Text style={[styles.footerText, styles.footerLink]}>
                  {quote.user.user_metadata.website}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default QuotePDF;
