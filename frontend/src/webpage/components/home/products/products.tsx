import React from "react";
import instituciones from "@/webpage/components/info/instituciones.json";
import {
  ProductsContainer,
  ProductsTitle,
  ProductsGrid,
  ProductCard,
  HighlightText,
  LogoContainer,
  LogoImage,
  ProductInfo,
  ProductTitle,
  InterestRateContainer,
  InterestRateLabel,
  InterestRateValue,
  ProductDetails,
  ActionButton,
} from "./style/constproduct";

interface Product {
  id: string;
  name: string;
  logo: string;
  minRate: number;
  products: {
    personalLoan: {
      minAmount: number;
      maxAmount: number;
      minTerm: number;
      maxTerm: number;
    };
  };
}

interface ProductsProps {
  onProductSelect?: (productId: string) => void;
}

const Products: React.FC<ProductsProps> = ({ onProductSelect }) => {
  const products: Product[] = instituciones.instituciones;

  const handleProductClick = (productId: string) => {
    if (onProductSelect) {
      onProductSelect(productId);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-EC", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ProductsContainer>
      <ProductsTitle>Productos recomendados</ProductsTitle>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <HighlightText>DESTACADO</HighlightText>
            <LogoContainer>
              <LogoImage
                src={product.logo}
                alt={`Logo ${product.name}`}
                loading="lazy"
                title={product.name}
              />
            </LogoContainer>
            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              <InterestRateContainer>
                <InterestRateLabel>Tasa de interés</InterestRateLabel>
                <InterestRateValue>
                  {product.minRate.toFixed(1)}%
                </InterestRateValue>
              </InterestRateContainer>
              <ProductDetails>
                Monto mínimo:{" "}
                {formatCurrency(product.products.personalLoan.minAmount)}
              </ProductDetails>
              <ProductDetails>
                Plazo: {product.products.personalLoan.minTerm} a{" "}
                {product.products.personalLoan.maxTerm} meses
              </ProductDetails>
            </ProductInfo>
            
          </ProductCard>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
};

export default Products;
