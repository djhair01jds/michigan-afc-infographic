import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import AFCRulesInfographic from './AFCRulesInfographic';

describe('AFCRulesInfographic', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<AFCRulesInfographic />);
    });

    it('renders the main title', () => {
      render(<AFCRulesInfographic />);
      expect(screen.getByText('Michigan AFC Rules Comparison')).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
      render(<AFCRulesInfographic />);
      expect(screen.getByText('November 2025 Unified Ruleset - Interactive Impact Analysis')).toBeInTheDocument();
    });

    it('renders all four facility type buttons', () => {
      render(<AFCRulesInfographic />);
      expect(screen.getByText('Family Home')).toBeInTheDocument();
      expect(screen.getByText('Small Group Home')).toBeInTheDocument();
      expect(screen.getByText('Large Group Home')).toBeInTheDocument();
      expect(screen.getByText('Congregate Facility')).toBeInTheDocument();
    });

    it('renders capacity labels for each facility type', () => {
      render(<AFCRulesInfographic />);
      expect(screen.getByText('1-6 residents')).toBeInTheDocument();
      expect(screen.getByText('7-12 residents')).toBeInTheDocument();
      expect(screen.getByText('13-20 residents')).toBeInTheDocument();
      expect(screen.getByText('21+ residents')).toBeInTheDocument();
    });

    it('renders the impact summary section', () => {
      render(<AFCRulesInfographic />);
      expect(screen.getByText('High Impact')).toBeInTheDocument();
      expect(screen.getByText('Medium Impact')).toBeInTheDocument();
      expect(screen.getByText('Beneficial')).toBeInTheDocument();
      expect(screen.getByText('No Change')).toBeInTheDocument();
    });

    it('renders the important notes section', () => {
      render(<AFCRulesInfographic />);
      expect(screen.getByText('Important Notes:')).toBeInTheDocument();
    });
  });

  describe('Default State', () => {
    it('defaults to Small Group Home selected', () => {
      render(<AFCRulesInfographic />);
      expect(screen.getByText('Small Group Home - Change Summary')).toBeInTheDocument();
    });

    it('shows change cards for Small Group Home by default', () => {
      render(<AFCRulesInfographic />);
      // Small Group Home has "AFC New Provider Training Required" as first item
      expect(screen.getByText('AFC New Provider Training Required')).toBeInTheDocument();
    });
  });

  describe('Facility Type Selection', () => {
    it('switches to Family Home when clicked', () => {
      render(<AFCRulesInfographic />);
      fireEvent.click(screen.getByText('Family Home'));
      expect(screen.getByText('Family Home - Change Summary')).toBeInTheDocument();
    });

    it('switches to Large Group Home when clicked', () => {
      render(<AFCRulesInfographic />);
      fireEvent.click(screen.getByText('Large Group Home'));
      expect(screen.getByText('Large Group Home - Change Summary')).toBeInTheDocument();
    });

    it('switches to Congregate Facility when clicked', () => {
      render(<AFCRulesInfographic />);
      fireEvent.click(screen.getByText('Congregate Facility'));
      expect(screen.getByText('Congregate Facility - Change Summary')).toBeInTheDocument();
    });

    it('collapses expanded cards when switching facility type', () => {
      render(<AFCRulesInfographic />);

      // Expand a card in Small Group Home
      const trainingCard = screen.getByText('AFC New Provider Training Required').closest('button');
      fireEvent.click(trainingCard!);
      expect(screen.getByText('ACTION REQUIRED')).toBeInTheDocument();

      // Switch to Family Home
      fireEvent.click(screen.getByText('Family Home'));

      // The expanded content should no longer be visible (card collapsed)
      expect(screen.queryByText('ACTION REQUIRED')).not.toBeInTheDocument();
    });
  });

  describe('Card Expansion', () => {
    it('expands a card when clicked', () => {
      render(<AFCRulesInfographic />);

      const trainingCard = screen.getByText('AFC New Provider Training Required').closest('button');
      fireEvent.click(trainingCard!);

      expect(screen.getByText('ACTION REQUIRED')).toBeInTheDocument();
      expect(screen.getByText(/Register for training notifications/)).toBeInTheDocument();
    });

    it('collapses an expanded card when clicked again', () => {
      render(<AFCRulesInfographic />);

      const trainingCard = screen.getByText('AFC New Provider Training Required').closest('button');

      // Expand
      fireEvent.click(trainingCard!);
      expect(screen.getByText('ACTION REQUIRED')).toBeInTheDocument();

      // Collapse
      fireEvent.click(trainingCard!);
      expect(screen.queryByText('ACTION REQUIRED')).not.toBeInTheDocument();
    });

    it('only allows one card expanded at a time', () => {
      render(<AFCRulesInfographic />);

      // Find two different cards
      const cards = screen.getAllByText(/Training|Fire Safety/).filter(el =>
        el.closest('button')
      );

      const firstCard = cards[0].closest('button');
      const secondCard = cards[1].closest('button');

      // Expand first card
      fireEvent.click(firstCard!);
      const actionRequiredElements = screen.getAllByText('ACTION REQUIRED');
      expect(actionRequiredElements).toHaveLength(1);

      // Expand second card - first should collapse
      fireEvent.click(secondCard!);
      const actionRequiredAfter = screen.getAllByText('ACTION REQUIRED');
      expect(actionRequiredAfter).toHaveLength(1);
    });

    it('shows old vs new rule comparison when expanded', () => {
      render(<AFCRulesInfographic />);

      const trainingCard = screen.getByText('AFC New Provider Training Required').closest('button');
      fireEvent.click(trainingCard!);

      expect(screen.getByText(/OLD RULE:/)).toBeInTheDocument();
      expect(screen.getByText(/NEW RULE:/)).toBeInTheDocument();
    });

    it('shows timeline and cost information', () => {
      render(<AFCRulesInfographic />);

      // Timeline and cost are visible in the collapsed card header
      expect(screen.getByText('6 months from license/hire')).toBeInTheDocument();
      expect(screen.getByText('$0 (free training)')).toBeInTheDocument();
    });
  });

  describe('Impact Counts', () => {
    it('displays correct impact counts for Small Group Home', () => {
      render(<AFCRulesInfographic />);

      // Small Group Home has: 4 high, 4 medium, 6 beneficial, 1 none
      // (food-labeling card split into Nutrition Standards + Food Service Requirements)
      const allFours = screen.getAllByText('4');
      expect(allFours.length).toBeGreaterThanOrEqual(2); // high (4) and medium (4)
      expect(screen.getByText('6')).toBeInTheDocument(); // beneficial
      expect(screen.getByText('1')).toBeInTheDocument(); // none
    });
  });

  describe('Link Attributes', () => {
    it('external links have target="_blank"', () => {
      render(<AFCRulesInfographic />);

      // Expand a card to see the PDF links
      const trainingCard = screen.getByText('AFC New Provider Training Required').closest('button');
      fireEvent.click(trainingCard!);

      const pdfLinks = screen.getAllByText('View PDF');
      pdfLinks.forEach(link => {
        expect(link.closest('a')).toHaveAttribute('target', '_blank');
      });
    });

    it('external links have rel="noopener noreferrer"', () => {
      render(<AFCRulesInfographic />);

      // Expand a card to see the PDF links
      const trainingCard = screen.getByText('AFC New Provider Training Required').closest('button');
      fireEvent.click(trainingCard!);

      const pdfLinks = screen.getAllByText('View PDF');
      pdfLinks.forEach(link => {
        expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('sponsor link has correct attributes', () => {
      render(<AFCRulesInfographic />);

      const sponsorLink = screen.getByText('Jireh Digital Solutions');
      expect(sponsorLink).toHaveAttribute('target', '_blank');
      expect(sponsorLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(sponsorLink).toHaveAttribute('href', 'https://jirehdigitalsolutions.com/');
    });
  });

  describe('Impact Badges', () => {
    it('displays HIGH badge for high impact items', () => {
      render(<AFCRulesInfographic />);
      expect(screen.getAllByText(/HIGH/).length).toBeGreaterThan(0);
    });

    it('displays MEDIUM badge for medium impact items', () => {
      render(<AFCRulesInfographic />);
      expect(screen.getAllByText(/MEDIUM/).length).toBeGreaterThan(0);
    });

    it('displays BENEFICIAL badge for beneficial items', () => {
      render(<AFCRulesInfographic />);
      expect(screen.getAllByText(/BENEFICIAL/).length).toBeGreaterThan(0);
    });
  });

  describe('Visual Comparison', () => {
    it('shows before/after visual when card is expanded', () => {
      render(<AFCRulesInfographic />);

      const trainingCard = screen.getByText('AFC New Provider Training Required').closest('button');
      fireEvent.click(trainingCard!);

      expect(screen.getByText('Quick Visual')).toBeInTheDocument();
      expect(screen.getByText('Before')).toBeInTheDocument();
      expect(screen.getByText('After')).toBeInTheDocument();
    });
  });
});
