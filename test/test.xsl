<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes" omit-xml-declaration="yes" xml:lang="en"/>
    <xsl:template match="/">
        <xsl:apply-templates select="*"/>
    </xsl:template>
    <xsl:template match="*">
        <label><xsl:value-of select="name()"/></label>
        <ol><xsl:apply-templates select="@*"/></ol>
        <xsl:apply-templates select="*"/>
    </xsl:template>
    <xsl:template match="@*">
        <li>
            <b><xsl:value-of select="name()"/></b> :
            <span>
                <xsl:attribute name="title"  ><xsl:value-of select="name()"/></xsl:attribute>
                <xsl:attribute name="value"  ><xsl:value-of select="."/></xsl:attribute>
                <xsl:value-of select="."/>
            </span>
        </li>
    </xsl:template>

</xsl:stylesheet>