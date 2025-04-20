import InvoiceDetails from "@/pages/InvoiceDetails";

export default function InvoiceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <InvoiceDetails id={params.id} />;
}
