import {InputType, AnalysisResult} from '../types';
import {saveToHistory} from './storage';

// Mock AI analysis function
// In production, replace this with actual API calls to your backend
export async function analyzeContent(
  type: InputType,
  content: string,
): Promise<AnalysisResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const contentLower = content.toLowerCase();

  // Simple heuristics for demo purposes
  const suspiciousWords = [
    'shocking',
    'unbelievable',
    'miracle',
    'secret',
    'they dont want you to know',
  ];
  const hasSuspiciousWords = suspiciousWords.some(word =>
    contentLower.includes(word),
  );

  const hasExcessiveCaps =
    content.split('').filter(c => c === c.toUpperCase() && c !== c.toLowerCase())
      .length >
    content.length * 0.3;
  const hasExcessivePunctuation = (content.match(/[!?]{2,}/g) || []).length > 2;

  let verdict: 'REAL' | 'FAKE' | 'UNCERTAIN';
  let confidence: number;

  if (hasSuspiciousWords || hasExcessiveCaps || hasExcessivePunctuation) {
    verdict = 'FAKE';
    confidence = 75 + Math.floor(Math.random() * 20);
  } else if (content.length < 50) {
    verdict = 'UNCERTAIN';
    confidence = 40 + Math.floor(Math.random() * 20);
  } else {
    verdict = 'REAL';
    confidence = 70 + Math.floor(Math.random() * 25);
  }

  const redFlags: string[] = [];
  if (hasSuspiciousWords) {
    redFlags.push('Contains sensational or clickbait language');
  }
  if (hasExcessiveCaps) {
    redFlags.push('Excessive use of capital letters detected');
  }
  if (hasExcessivePunctuation) {
    redFlags.push('Unusual punctuation patterns found');
  }
  if (content.length < 100) {
    redFlags.push('Content is unusually short for a news article');
  }

  const result: AnalysisResult = {
    verdict,
    confidence,
    summary:
      verdict === 'FAKE'
        ? 'This content shows multiple indicators of misinformation and should be treated with skepticism.'
        : verdict === 'REAL'
        ? 'This content appears to be legitimate based on our analysis, but always verify through multiple sources.'
        : 'Unable to determine authenticity with high confidence. Additional verification recommended.',
    analysis: {
      sourceCredibility:
        type === 'url'
          ? 'Domain reputation and historical accuracy checked against known fact-checking databases.'
          : 'Source information not available for this input type. Consider checking the original source.',
      languageQuality:
        hasExcessiveCaps || hasExcessivePunctuation
          ? 'Language quality is poor with excessive formatting and emotional appeals.'
          : 'Language appears professional and well-structured.',
      factualConsistency:
        'Cross-referenced claims against verified databases and recent news reports.',
      biasIndicators: hasSuspiciousWords
        ? 'Strong emotional language and sensationalism detected, indicating potential bias.'
        : 'Content appears relatively neutral with minimal bias indicators.',
      verificationStatus:
        verdict === 'FAKE'
          ? 'Multiple red flags detected. Content likely contains misinformation.'
          : 'No major verification issues found, but independent verification is always recommended.',
    },
    redFlags,
    recommendations: [
      'Cross-check this information with established news sources',
      'Look for the original source of the claim',
      'Check if reputable fact-checking organizations have reviewed this',
      'Be cautious of sharing unverified information',
      'Consider the motivation behind the content',
    ],
    sources:
      type === 'url'
        ? [
            'https://www.snopes.com',
            'https://www.factcheck.org',
            'https://www.politifact.com',
          ]
        : undefined,
    timestamp: new Date().toISOString(),
  };

  // Save to history
  await saveToHistory(type, content, result);

  return result;
}

// Function to integrate with actual AI APIs
// Replace this with your actual implementation
export async function analyzeWithAI(
  type: InputType,
  content: string,
): Promise<AnalysisResult> {
  // Example: Call your backend API
  // const response = await fetch('YOUR_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify({type, content}),
  // });
  // return await response.json();

  return analyzeContent(type, content);
}