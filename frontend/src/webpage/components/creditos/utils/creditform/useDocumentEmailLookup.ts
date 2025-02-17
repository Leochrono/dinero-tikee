import { useState, useEffect } from "react";
import { userService } from "@/src/core/services/user.service";
import { CreditFormData } from "@/src/core/types/types";

export interface ValidFields {
  email: boolean;
  document: boolean;
  location: boolean;
}

interface UseDocumentEmailLookupProps {
  document: string;
  setFormData: React.Dispatch<React.SetStateAction<CreditFormData>>;
}

export const useDocumentEmailLookup = ({
  document,
  setFormData,
}: UseDocumentEmailLookupProps) => {
  const [validFields, setValidFields] = useState<ValidFields>({
    email: false,
    document: false,
    location: false,
  });

  const validateDocument = (doc: string): boolean => {
    if (!doc) return false;
    const length = doc.length;
    return length >= 8 && length <= 10 && /^\d+$/.test(doc);
  };

  useEffect(() => {
    let isSubscribed = true;

    const fetchEmailByDocument = async () => {
      if (!validateDocument(document)) return;

      try {
        const response = await userService.findByDocument(document);

        if (!isSubscribed || !response?.success) return;

        const email = response.data?.email;

        if (email) {
          setFormData((prev) => ({ ...prev, email }));
          setValidFields((prev) => ({
            ...prev,
            email: true,
            document: true,
          }));
        } else {
          setValidFields((prev) => ({
            ...prev,
            email: false,
            document: false,
          }));
        }
      } catch (error) {
        if (isSubscribed) {
          setValidFields((prev) => ({
            ...prev,
            email: false,
            document: false,
          }));
        }
      }
    };

    const timeoutId = setTimeout(() => {
      fetchEmailByDocument();
    }, 500);

    return () => {
      isSubscribed = false;
      clearTimeout(timeoutId);
    };
  }, [document, setFormData]);

  return {
    validFields,
    setValidFields,
    validateDocument,
  };
};
