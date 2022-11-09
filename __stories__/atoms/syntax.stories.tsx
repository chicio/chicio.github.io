import React from "react";
import { Meta } from "@storybook/react";
import { syntax } from "../../src/components/design-system/atoms/syntax";
import styled from "styled-components";

const htmlSwift = `
<pre class="language-swift"><code class="language-swift"><span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token builtin">ShowModalTabBarItem</span><span class="token punctuation">:</span> <span class="token builtin">View</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> radius<span class="token punctuation">:</span> <span class="token builtin">CGFloat</span>
    <span class="token keyword">let</span> action<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">Void</span>

    <span class="token keyword">public</span> <span class="token keyword">init</span><span class="token punctuation">(</span>radius<span class="token punctuation">:</span> <span class="token builtin">CGFloat</span><span class="token punctuation">,</span> action<span class="token punctuation">:</span> @escaping <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">Void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">self</span><span class="token punctuation">.</span>radius <span class="token operator">=</span> radius
        <span class="token keyword">self</span><span class="token punctuation">.</span>action <span class="token operator">=</span> action
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">var</span> body<span class="token punctuation">:</span> some <span class="token builtin">View</span> <span class="token punctuation">{</span>
        <span class="token function">VStack</span><span class="token punctuation">(</span>spacing<span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">Image</span><span class="token punctuation">(</span>systemName<span class="token punctuation">:</span> <span class="token string">"plus.circle.fill"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">resizable</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">aspectRatio</span><span class="token punctuation">(</span>contentMode<span class="token punctuation">:</span> <span class="token punctuation">.</span>fit<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> radius<span class="token punctuation">,</span> height<span class="token punctuation">:</span> radius<span class="token punctuation">,</span> alignment<span class="token punctuation">:</span> <span class="token punctuation">.</span>center<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">foregroundColor</span><span class="token punctuation">(</span><span class="token function">Color</span><span class="token punctuation">(</span><span class="token punctuation">.</span>systemBlue<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token function">Color</span><span class="token punctuation">(</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">cornerRadius</span><span class="token punctuation">(</span>radius<span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">overlay</span><span class="token punctuation">(</span><span class="token function">RoundedRectangle</span><span class="token punctuation">(</span>cornerRadius<span class="token punctuation">:</span> radius<span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stroke</span><span class="token punctuation">(</span><span class="token function">Color</span><span class="token punctuation">(</span><span class="token punctuation">.</span>blue<span class="token punctuation">)</span><span class="token punctuation">,</span> lineWidth<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">frame</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> radius<span class="token punctuation">,</span> height<span class="token punctuation">:</span> radius<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">onTapGesture</span><span class="token punctuation">(</span>perform<span class="token punctuation">:</span> action<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
`;

const htmlKotlin = `
<pre class="language-kotlin"><code class="language-kotlin"><span class="token keyword">package</span> it<span class="token punctuation">.</span>chicio<span class="token punctuation">.</span>minesweeper<span class="token punctuation">.</span>field<span class="token punctuation">.</span>resolver

<span class="token keyword">import</span> io<span class="token punctuation">.</span>mockk<span class="token punctuation">.</span><span class="token operator">*</span>
<span class="token keyword">import</span> io<span class="token punctuation">.</span>mockk<span class="token punctuation">.</span>impl<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span>MockK
<span class="token keyword">import</span> io<span class="token punctuation">.</span>mockk<span class="token punctuation">.</span>junit5<span class="token punctuation">.</span>MockKExtension
<span class="token keyword">import</span> it<span class="token punctuation">.</span>chicio<span class="token punctuation">.</span>minesweeper<span class="token punctuation">.</span>FieldFactory
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>Assertions<span class="token punctuation">.</span>assertEquals
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>BeforeEach
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>DisplayName
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>Nested
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>Test
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>ExtendWith

<span class="token annotation builtin">@DisplayName</span><span class="token punctuation">(</span><span class="token string">"FieldsResolverByIteratingThroughThem"</span><span class="token punctuation">)</span>
<span class="token annotation builtin">@ExtendWith</span><span class="token punctuation">(</span>MockKExtension<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> FieldsResolverByIteratingThroughThemTest <span class="token punctuation">{</span>
    <span class="token annotation builtin">@MockK</span>
    <span class="token keyword">private</span> <span class="token keyword">lateinit</span> <span class="token keyword">var</span> fieldResolver<span class="token operator">:</span> FieldResolver

    <span class="token keyword">private</span> <span class="token keyword">lateinit</span> <span class="token keyword">var</span> fieldsResolverByIteratingThroughThem<span class="token operator">:</span> FieldsResolverByIteratingThroughThem

    <span class="token annotation builtin">@BeforeEach</span>
    <span class="token keyword">internal</span> <span class="token keyword">fun</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fieldsResolverByIteratingThroughThem <span class="token operator">=</span> <span class="token function">FieldsResolverByIteratingThroughThem</span><span class="token punctuation">(</span>fieldResolver<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token annotation builtin">@Nested</span>
    <span class="token annotation builtin">@DisplayName</span><span class="token punctuation">(</span><span class="token string">"resolve"</span><span class="token punctuation">)</span>
    <span class="token keyword">inner</span> <span class="token keyword">class</span> Resolve <span class="token punctuation">{</span>
        <span class="token annotation builtin">@Test</span>
        <span class="token keyword">fun</span> <span class="token function">\`single field list\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            every <span class="token punctuation">{</span> fieldResolver<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token punctuation">}</span> just Runs

            <span class="token keyword">val</span> fields <span class="token operator">=</span> fieldsResolverByIteratingThroughThem<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">listOf</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span><span class="token punctuation">)</span>

            <span class="token function">assertEquals</span><span class="token punctuation">(</span>fields<span class="token punctuation">,</span> <span class="token function">listOf</span><span class="token punctuation">(</span>resolvedField<span class="token punctuation">)</span><span class="token punctuation">)</span>
            verify <span class="token punctuation">{</span> fieldResolver<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token annotation builtin">@Test</span>
        <span class="token keyword">fun</span> <span class="token function">\`fields list\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            every <span class="token punctuation">{</span> fieldResolver<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token punctuation">}</span> returns resolvedField
            every <span class="token punctuation">{</span> fieldResolver<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>anotherField<span class="token punctuation">)</span> <span class="token punctuation">}</span> returns anotherResolvedField

            <span class="token keyword">val</span> fields <span class="token operator">=</span> fieldsResolverByIteratingThroughThem<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">listOf</span><span class="token punctuation">(</span>field<span class="token punctuation">,</span> anotherField<span class="token punctuation">)</span><span class="token punctuation">)</span>

            <span class="token function">assertEquals</span><span class="token punctuation">(</span>fields<span class="token punctuation">,</span> <span class="token function">listOf</span><span class="token punctuation">(</span>resolvedField<span class="token punctuation">,</span> anotherResolvedField<span class="token punctuation">)</span><span class="token punctuation">)</span>
            verifySequence <span class="token punctuation">{</span>
                fieldResolver<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span>
                fieldResolver<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>anotherField<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">val</span> field <span class="token operator">=</span> <span class="token function">FieldFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">make</span><span class="token punctuation">(</span>
                <span class="token function">arrayOf</span><span class="token punctuation">(</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
        <span class="token keyword">private</span> <span class="token keyword">val</span> resolvedField <span class="token operator">=</span> <span class="token function">FieldFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">make</span><span class="token punctuation">(</span>
                <span class="token function">arrayOf</span><span class="token punctuation">(</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"3"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
        <span class="token keyword">private</span> <span class="token keyword">val</span> anotherField <span class="token operator">=</span> <span class="token function">FieldFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">make</span><span class="token punctuation">(</span>
                <span class="token function">arrayOf</span><span class="token punctuation">(</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"."</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
        <span class="token keyword">private</span> <span class="token keyword">val</span> anotherResolvedField <span class="token operator">=</span> <span class="token function">FieldFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">make</span><span class="token punctuation">(</span>
                <span class="token function">arrayOf</span><span class="token punctuation">(</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"3"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        <span class="token function">arrayOf</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
`;

const StyledExampleCode = styled.div`
  ${syntax}
`;

export const Code: React.FC = () => (
  <>
    <StyledExampleCode dangerouslySetInnerHTML={{ __html: htmlSwift }} />
    <StyledExampleCode dangerouslySetInnerHTML={{ __html: htmlKotlin }} />
  </>
);

export default {
  title: "Atoms/Typography",
  component: Code,
} as Meta;
