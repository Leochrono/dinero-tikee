import { useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { creditStatusConfig } from "@/src/core/types/profilestatus";

interface CreditFiltersProps {
  onFilterChange: (filters: string[]) => void;
}

const CreditFilters = ({ onFilterChange }: CreditFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterClick = (filter: string) => {
    setSelectedFilters(current => {
      const newFilters = current.includes(filter)
        ? current.filter(f => f !== filter)
        : [...current, filter];
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'white' }}>
          Estado
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {Object.entries(creditStatusConfig).map(([key, value]) => (
            <Chip
              key={`status-filter-${key}`}  // Clave única
              label={value.text}
              onClick={() => handleFilterClick(key)}
              sx={{
                backgroundColor: selectedFilters.includes(key) 
                  ? value.color 
                  : 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                '&:hover': {
                  backgroundColor: selectedFilters.includes(key)
                    ? value.color
                    : 'rgba(255, 255, 255, 0.1)',
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CreditFilters;