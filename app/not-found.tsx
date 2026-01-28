import Link from "next/link";
import NeuralNetwork3D from "../components/NeuralNetwork3D";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-16 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-64 h-64 mx-auto relative rounded-3xl overflow-hidden border-2 border-border bg-[#0a0e17]">
          <NeuralNetwork3D />
        </div>
        <div>
          <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-heading text-secondary mb-4">Page Not Found</h2>
          <p className="text-secondary mb-8">
            The neural network couldn't find this page. The connection may have been lost.
          </p>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
